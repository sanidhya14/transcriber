import json
from channels.generic.websocket import WebsocketConsumer
from .core.transcribe import TranscriptionPipeline, transcribe_async
from .core.utils.writer_utils import get_writer, log_result
from .core.transcriptionModels import (
    DiarizarionOptions,
    TransciptionOutputOptions,
    TranscriptionRequest,
    FasterWhisperModelOptions,
    TranscriptionInferenceOptions,
)
from .core.utils.commons import generate_request_id
from .constants import response_codes
from .core.diarize import DiarizationPipeline, assign_speakers
import pickle


class TranscribeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        request_id = ""
        try:
            input_data = json.loads(text_data)
            request = TranscriptionRequest(
                model_options=FasterWhisperModelOptions(**input_data["model_options"]),
                inference_options=TranscriptionInferenceOptions(
                    **input_data["inference_options"]
                ),
                output_options=TransciptionOutputOptions(
                    **input_data["output_options"]
                ),
                diarization_options=DiarizarionOptions(
                    **input_data["diarization_options"]
                ),
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
            transcription_output = self.transcribe(request_id, request)
            self.send(
                text_data=json.dumps(
                    {"id": request_id, "status": response_codes.TRANSCRIPTION_COMPLETED}
                )
            )
            if request.diarization_options.enabled == True:
                transcription_result = self.diarize(request, transcription_output)
                self.send(
                    text_data=json.dumps(
                        {
                            "id": request_id,
                            "status": response_codes.DIARIZATION_COMPLETED,
                        }
                    )
                )
            else:
                transcription_result = transcription_output

            self.export_output(
                transcription_result,
                request.output_options,
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

    def transcribe(self, request_id: str, request: TranscriptionRequest) -> dict:
        model = TranscriptionPipeline(model_options=request.model_options)
        result = model(inference_options=request.inference_options)
        return transcribe_async(self, request_id, request.inference_options, result)

    def diarize(self, request: TranscriptionRequest, transcription: dict) -> dict:
        model = DiarizationPipeline(request.diarization_options)
        segments = model(
            audio=request.inference_options.audio,
            diarization_options=request.diarization_options,
        )
        return assign_speakers(segments, transcription)

    def export_output(
        self,
        result: dict,
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
