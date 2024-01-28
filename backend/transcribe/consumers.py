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
from .constants import response_codes
from .core.diarize import DiarizationPipeline, assign_speakers
import pickle
import logging
from .models import TranscriptMetadata
from .core.utils.db_utils import (
    create_transcript_metadata,
    update_transcript_metadata,
    create_transcript,
)


class TranscribeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        logger = logging.getLogger(__name__)
        request_id = ""
        try:
            # Parse request
            request = self.parse_request(text_data)

            # Initialize
            request_id = generate_request_id()
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
            transcription_output = self.transcribe(request_id, request)
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
                transcription_result = self.diarize(
                    request_id, request, transcription_output
                )
                notify(
                    self,
                    {
                        "id": request_id,
                        "status": response_codes.DIARIZATION_COMPLETED,
                    },
                )
            else:
                transcription_result = transcription_output

            # Store results in DB
            self.persist_results_in_db(
                request_id=request_id, result=transcription_result
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
                request_id=request_id,
                result=transcription_result,
                output_options=request.output_options,
            )
            notify(
                self,
                {
                    "id": request_id,
                    "status": response_codes.TRANSCRIPTION_JOB_OUTPUT_EXPORT_COMPLETED,
                },
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

    def transcribe(self, request_id: str, request: TranscriptionRequest) -> dict:
        update_transcript_metadata(
            request_id, {"status": response_codes.TRANSCRIPT_GENERATION_IN_PROGRESS}
        )
        model = TranscriptionPipeline(model_options=request.model_options)
        result = model(inference_options=request.inference_options)
        segment_collector_list = []
        for segment in result.segments:
            segment_dict = transcribe_segment(
                self, request_id, request.inference_options, segment
            )
            segment_collector_list.append(segment_dict)

        update_transcript_metadata(
            request_id, {"status": response_codes.TRANSCRIPT_GENERATION_COMPLETED}
        )
        return {"segments": segment_collector_list}

    def diarize(
        self, request_id: str, request: TranscriptionRequest, transcription: dict
    ) -> dict:
        update_transcript_metadata(
            request_id, {"status": response_codes.DIARIZATION_IN_PROGRESS}
        )
        model = DiarizationPipeline(request.diarization_options)
        segments = model(
            consumer=self,
            request_id=request_id,
            audio=request.inference_options.audio,
            diarization_options=request.diarization_options,
        )
        result = assign_speakers(self, segments, request_id, transcription)
        update_transcript_metadata(
            request_id, {"status": response_codes.DIARIZATION_COMPLETED}
        )
        return result

    def persist_results_in_db(self, request_id: str, result: dict):
        speakerMap = {}
        for segment in result["segments"]:
            childSpeakerMap = {}
            childSpeakerMap["speakerId"] = segment["speaker"]
            childSpeakerMap["speakerName"] = segment["speaker"]
            create_transcript(
                request_id=request_id,
                params={
                    "startTimeInSeconds": float(segment["start"]),
                    "transcriptSegment": {
                        "speakerId": segment["speaker"],
                        "startTimeInSeconds": segment["start"],
                        "endTimeInSeconds": segment["end"],
                        "text": segment["text"],
                    },
                },
            )
            speakerMap[childSpeakerMap["speakerId"]] = childSpeakerMap

        update_transcript_metadata(
            request_id=request_id,
            params={
                "speakerMap": speakerMap,
                "status": response_codes.TRANSCRIPTION_JOB_COMPLETED,
            },
        )

    def export_output(
        self,
        request_id: str,
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
