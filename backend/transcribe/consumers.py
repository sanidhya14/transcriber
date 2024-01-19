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


class TranscribeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        input_data = json.loads(text_data)
        transcription_request = TranscriptionRequest(
            model_options=FasterWhisperModelOptions(**input_data["model_options"]),
            inference_options=TranscriptionInferenceOptions(**input_data["inference_options"]),
            output_options=TransciptionOutputOptions(**input_data["output_options"]),
        )
        self.send(text_data=json.dumps({"message": "Starting Transcription"}))
        self.transcribe(transcription_request)
        self.send(text_data=json.dumps({"message": "Transcription Finished"}))

    def transcribe(self, request: TranscriptionRequest):
        model = get_model_instance(request.model_options)
        result = transcribe_with_faster_whisper(
            model,
            request.inference_options,
        )
        self.process_output(
            result,
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
        # Result Debugging
        log_result(result, True)
        writer(
            result,
            output_options.output_file_name,
            output_options._asdict(),
        )
