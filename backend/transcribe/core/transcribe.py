from channels.generic.websocket import WebsocketConsumer
from faster_whisper import WhisperModel
from .transcriptionModels import (
    TranscriptionInferenceOptions,
    TranscriptionResult,
    FasterWhisperModelOptions,
    deserialize_segment,
)
import time
from django.conf import settings
from ..constants import response_codes
from .utils.commons import notify
import logging
from typing import BinaryIO, Union
import numpy as np


class TranscriptionPipeline:
    def __init__(
        self,
        model_options: FasterWhisperModelOptions,
    ):
        self.model = WhisperModel(
            model_size_or_path=model_options.model_size,
            device=model_options.device,
            device_index=model_options.device_index,
            compute_type=model_options.compute_type,
            cpu_threads=model_options.cpu_threads,
            num_workers=model_options.num_workers,
            download_root=model_options.download_root,
            local_files_only=model_options.local_files_only,
        )

    def __call__(
        self, audio: Union[np.ndarray], inference_options: TranscriptionInferenceOptions
    ) -> TranscriptionResult:
        segments, info = self.model.transcribe(
            audio=audio,
            language=inference_options.language,
            task=inference_options.task,
            best_of=inference_options.best_of,
            beam_size=inference_options.beam_size,
            patience=inference_options.patience,
            length_penalty=inference_options.length_penalty,
            suppress_tokens=inference_options.suppress_tokens,
            initial_prompt=inference_options.initial_prompt,
            condition_on_previous_text=inference_options.condition_on_previous_text,
            compression_ratio_threshold=inference_options.compression_ratio_threshold,
            log_prob_threshold=inference_options.log_prob_threshold,
            no_speech_threshold=inference_options.no_speech_threshold,
            word_timestamps=inference_options.word_timestamps,
            prepend_punctuations=inference_options.prepend_punctuations,
            append_punctuations=inference_options.append_punctuations,
            vad_filter=False, # VAD filtering is self managed
        )
        return TranscriptionResult(segments=segments, info=info)


def transcribe_segment(
    consumer: WebsocketConsumer,
    request_id: str,
    audio_metadata: dict,
    inference_options: TranscriptionInferenceOptions,
    segment,
) -> dict:
    logger = logging.getLogger(__name__)
    segment_start_time = time.time()
    logger.debug(f"Segment received: {segment}")
    segment_dict = deserialize_segment(segment).to_dict()
    logger.info(f"Deserialized segment: {str(segment_dict)}" + "\n")
    logger.debug(
        "Pretty Text: [%.2fs -> %.2fs] %s"
        % (segment_dict["start"], segment_dict["end"], segment_dict["text"])
    )
    progress = round((segment.end / audio_metadata["duration"]) * 100)
    notify(
        consumer,
        {
            "id": request_id,
            "status": response_codes.TRANSCRIPT_GENERATION_IN_PROGRESS,
            "progress": progress,
            "estimatedTime": "",
        },
    )
    return segment_dict
