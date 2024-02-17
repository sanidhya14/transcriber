import json
import time
from channels.generic.websocket import WebsocketConsumer
from .core.transcribe import TranscriptionPipeline, transcribe_segment
from .core.utils.writer_utils import get_writers
from .core.transcriptionModels import (
    DiarizarionOptions,
    TransciptionOutputOptions,
    TranscriptionRequest,
    FasterWhisperModelOptions,
    TranscriptionInferenceOptions,
)
from .core.utils.commons import generate_request_id, notify
from .constants import response_codes, commons
from .core.diarize import DiarizationPipeline, assign_speakers
import pickle
import logging
from .models import TranscriptMetadata
from .core.utils.db_utils import (
    create_transcript_metadata,
    update_transcript_metadata,
    create_transcript_segment,
)
from .core.audio import decode_audio
from .core.vad import (
    SpeechTimestampsMap,
    VadOptions,
    collect_chunks,
    get_speech_timestamps,
)
from typing import BinaryIO, Union
import numpy as np


class TranscribeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        logger = logging.getLogger(__name__)
        request_id = ""
        try:
            request_start_time = time.time()
            # Parse request
            request = self.parse_request(text_data)

            # Initialize
            request_id = generate_request_id()
            audio, audio_metadata, speech_chunks = self.process_audio(request)
            create_transcript_metadata(
                request_id, {"sourceLanguage": request.inference_options.language}
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPTION_JOB_INITIALIZED,
                },
            )

            # Transcribe
            transcription_output = self.transcribe(
                request_id, audio, audio_metadata, request
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPT_GENERATION_COMPLETED,
                    "progress": 100,
                    "estimatedTime": "",
                },
            )

            # Diarize
            if request.diarization_options.enabled == True:
                notify(
                    self,
                    {
                        "id": request_id,
                        "status": response_codes.DIARIZATION_IN_PROGRESS,
                    },
                )
                transcription_result_with_diarization = self.diarize(
                    request_id, audio, request, transcription_output
                )
                notify(
                    self,
                    {
                        "id": request_id,
                        "status": response_codes.DIARIZATION_COMPLETED,
                    },
                )
            else:
                transcription_result_with_diarization = transcription_output

            # Restore Timestamps for VAD filtering
            if request.inference_options.vad_filter == True:
                transcription_result_timestamp_restored = (
                    self.restore_speech_timestamps(
                        transcription_result_with_diarization,
                        speech_chunks,
                        commons.SAMPLING_RATE,
                    )
                )
            else:
                transcription_result_timestamp_restored = (
                    transcription_result_with_diarization
                )

            # Store results in DB
            self.persist_results_in_db(
                request_id=request_id, request=request, result=transcription_result_timestamp_restored
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPTION_JOB_COMPLETED,
                },
            )

            # Export results
            self.export_output(
                result=transcription_result_timestamp_restored,
                output_options=request.output_options,
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPTION_JOB_OUTPUT_EXPORT_COMPLETED,
                },
            )
            request_end_time = time.time()
            logger.info(
                f"Total request processing time: {request_end_time - request_start_time} seconds"
            )

        except Exception as e:
            logger.error("Failure occured: ", e)
            update_transcript_metadata(
                request_id, {"status": response_codes.TRANSCRIPTION_JOB_FAILED}
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPTION_JOB_FAILED,
                    "errorMessage": str(e),
                },
            )

    def parse_request(self, payload):
        input_data = json.loads(payload)
        return TranscriptionRequest(
            model_options=FasterWhisperModelOptions(**input_data["model_options"]),
            inference_options=TranscriptionInferenceOptions(
                **input_data["inference_options"]
            ),
            output_options=TransciptionOutputOptions(**input_data["output_options"]),
            diarization_options=DiarizarionOptions(**input_data["diarization_options"]),
        )

    def process_audio(self, request: TranscriptionRequest):
        logger = logging.getLogger(__name__)
        audio = decode_audio(request.inference_options.audio, commons.SAMPLING_RATE)
        audio_metadata = {}
        audio_metadata["originalDuration"] = audio.shape[0] / commons.SAMPLING_RATE
        logger.info(
            f"Processing audio with original duration {audio_metadata['originalDuration']}s"
        )

        if request.inference_options.vad_filter == True:
            audio, speech_chunks = self.perform_vad_filtering(
                audio, request.inference_options.vad_parameters
            )
        else:
            speech_chunks = None

        audio_metadata["duration"] = audio.shape[0] / commons.SAMPLING_RATE
        logger.info(
            "VAD filter removed %ss of audio",
            audio_metadata["originalDuration"] - audio_metadata["duration"],
        )
        return audio, audio_metadata, speech_chunks

    def perform_vad_filtering(self, audio: Union[np.ndarray], vad_parameters: dict):
        logger = logging.getLogger(__name__)
        speech_chunks = get_speech_timestamps(audio, vad_parameters)
        audio = collect_chunks(audio, speech_chunks)
        duration_after_vad = audio.shape[0] / commons.SAMPLING_RATE
        logger.debug(
            "VAD filter kept the following audio segments: %s",
            ", ".join(
                "[%ss -> %ss]"
                % (
                    chunk["start"] / commons.SAMPLING_RATE,
                    chunk["end"] / commons.SAMPLING_RATE,
                )
                for chunk in speech_chunks
            ),
        )
        return audio, speech_chunks

    def transcribe(
        self,
        request_id: str,
        audio: Union[np.ndarray],
        audio_metadata: dict,
        request: TranscriptionRequest,
    ) -> dict:
        update_transcript_metadata(
            request_id, {"status": response_codes.TRANSCRIPT_GENERATION_IN_PROGRESS}
        )
        model = TranscriptionPipeline(model_options=request.model_options)
        result = model(audio=audio, inference_options=request.inference_options)
        segment_collector_list = []
        for segment in result.segments:
            segment_dict = transcribe_segment(
                self, request_id, audio_metadata, request.inference_options, segment
            )
            segment_collector_list.append(segment_dict)

        update_transcript_metadata(
            request_id, {"status": response_codes.TRANSCRIPT_GENERATION_COMPLETED}
        )
        return {"segments": segment_collector_list}

    def diarize(
        self,
        request_id: str,
        audio: Union[np.ndarray],
        request: TranscriptionRequest,
        transcription: dict,
    ) -> dict:
        update_transcript_metadata(
            request_id, {"status": response_codes.DIARIZATION_IN_PROGRESS}
        )
        model = DiarizationPipeline(request.diarization_options)
        segments = model(
            consumer=self,
            request_id=request_id,
            audio=audio,
            diarization_options=request.diarization_options,
        )
        result = assign_speakers(self, segments, request_id, transcription)
        update_transcript_metadata(
            request_id, {"status": response_codes.DIARIZATION_COMPLETED}
        )
        return result

    def restore_speech_timestamps(
        self,
        result: dict,
        speech_chunks: list[dict],
        sampling_rate: int,
    ) -> dict:
        speech_timestamp_map = SpeechTimestampsMap(speech_chunks, sampling_rate)

        for segment in result["segments"]:
            if segment["words"]:
                words = []
                for word in segment["words"]:
                    # Ensure the word start and end times are resolved to the same chunk.
                    middle = (word["start"] + word["end"]) / 2
                    chunk_index = speech_timestamp_map.get_chunk_index(middle)
                    word["start"] = speech_timestamp_map.get_original_time(
                        word["start"], chunk_index
                    )
                    word["end"] = speech_timestamp_map.get_original_time(
                        word["end"], chunk_index
                    )
                    words.append(word)

                segment["start"] = words[0]["start"]
                segment["end"] = words[-1]["end"]
                segment["words"] = words

            else:
                segment["start"] = speech_timestamp_map.get_original_time(
                    segment["start"]
                )
                segment["end"] = speech_timestamp_map.get_original_time(segment["end"])

        return result

    def persist_results_in_db(self, request_id: str, request: TranscriptionRequest, result: dict):
        speakerMap = {}
        for segment in result["segments"]:
            if request.diarization_options.enabled == True:
                childSpeakerMap = {}
                childSpeakerMap["speakerId"] = segment["speaker"]
                childSpeakerMap["speakerName"] = segment["speaker"]
                speakerMap[childSpeakerMap["speakerId"]] = childSpeakerMap

            create_transcript_segment(
                request_id=request_id,
                params={
                    "startTimeInSeconds": float(segment["start"]),
                    "transcriptSegment": {
                        "speakerId": segment.get("speaker", ""),
                        "startTimeInSeconds": segment["start"],
                        "endTimeInSeconds": segment["end"],
                        "text": segment["text"],
                    },
                },
            )

        update_transcript_metadata(
            request_id=request_id,
            params={
                "speakerMap": speakerMap,
                "status": response_codes.TRANSCRIPTION_JOB_COMPLETED,
            },
        )

    def export_output(
        self,
        result: dict,
        output_options: TransciptionOutputOptions,
    ):
        writer = get_writers(
            output_dir=output_options.output_dir,
            output_formats=output_options.output_formats,
        )
        writer(
            result,
            output_options.output_file_name,
            output_options._asdict(),
        )
