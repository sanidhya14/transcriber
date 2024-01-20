import json
from channels.generic.websocket import WebsocketConsumer
from .core.transcribe import (
    get_model_instance,
    transcribe_with_faster_whisper,
    TranscriptionResult,
)
from .core.utils.writer_utils import get_writer, log_result
from .core.transcriptionModels import (
    TransciptionOutputOptions,
    TranscriptionRequest,
    FasterWhisperModelOptions,
    TranscriptionInferenceOptions,
)
from .core.utils.commons import generate_request_id
from .constants import response_codes
from pydub import AudioSegment
import time
import threading


class TranscribeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        request_id = ""
        try:
            input_data = json.loads(text_data)
            transcription_request = TranscriptionRequest(
                model_options=FasterWhisperModelOptions(**input_data["model_options"]),
                inference_options=TranscriptionInferenceOptions(
                    **input_data["inference_options"]
                ),
                output_options=TransciptionOutputOptions(
                    **input_data["output_options"]
                ),
            )
            # Configure environments fetching & transcibe request population here
            audio_metadata = self.fetch_audio_metadata(
                transcription_request.inference_options.audio
            )
            request_id = generate_request_id()
            self.send(
                text_data=json.dumps(
                    {
                        "id": request_id,
                        "status": response_codes.TRANSCRIPTION_INITIALIZING,
                    }
                )
            )
            self.transcribe(request_id, transcription_request, audio_metadata)
            self.send(
                text_data=json.dumps(
                    {"id": request_id, "status": response_codes.TRANSCRIPTION_COMPLETED}
                )
            )
        except Exception as e:
            self.send(
                text_data=json.dumps(
                    {
                        "id": request_id,
                        "status": response_codes.TRANSCRIPTION_FAILED,
                        "errorMessage": e,
                    }
                )
            )

    def transcribe(
        self, request_id: str, request: TranscriptionRequest, audio_metadata: dict
    ):
        model = get_model_instance(request.model_options)
        start_timestamp = time.time()
        result = transcribe_with_faster_whisper(
            model,
            request.inference_options,
        )
        segment_collector_list = []
        for segment in result.segments:
            # In debug mode only
            print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
            segment_collector_list.append(segment)
            if self.should_send_progress_message(start_timestamp) is True:
                self.send(
                    text_data=json.dumps(
                        {
                            "id": request_id,
                            "status": response_codes.TRANSCRIPTION_IN_PROGRESS,
                            "progress": round(
                                (segment.end / audio_metadata["duration"]) * 100
                            ),
                            "estimatedTime": "",
                        }
                    )
                )
        self.process_output(
            {"segments": segment_collector_list},
            request.output_options,
        )

    def process_output(
        self,
        result: TranscriptionResult,
        output_options: TransciptionOutputOptions,
    ):
        writer = get_writer(
            output_dir=output_options.output_dir,
            output_format=output_options.output_format,
        )
        writer(
            result,
            output_options.output_file_name,
            output_options._asdict(),
        )

    def fetch_audio_metadata(self, file_path: str):
        audio = AudioSegment.from_file(file_path)
        return {"duration": audio.duration_seconds}

    def should_send_progress_message(self, start_time):
        if time.time() - start_time > 0:
            return True
        else:
            return False
