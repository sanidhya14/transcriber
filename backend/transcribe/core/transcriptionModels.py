from typing import BinaryIO, List, NamedTuple, Optional, Union, Iterable
import numpy as np
from faster_whisper.transcribe import Segment, TranscriptionInfo
from faster_whisper.vad import VadOptions
import torch


# See Args here: https://github.com/guillaumekln/faster-whisper/blob/d4222da952fde2aa4064aad820e207d0c7a9de75/faster_whisper/transcribe.py#LL90C11-L90C29
class FasterWhisperModelOptions(NamedTuple):
    model_size: str = "small"
    device: str = "cpu"
    device_index: Union[int, List[int]] = 0
    compute_type: str = "int8"
    cpu_threads: int = 0
    num_workers: int = 1
    download_root: Optional[str] = None
    # TODO: Update to fetch model only which is locally stored.
    # Custom impl will be done to fetch from self managed remote & not HuggingFace
    local_files_only: bool = False


# See Args from: https://github.com/guillaumekln/faster-whisper/blob/d4222da952fde2aa4064aad820e207d0c7a9de75/faster_whisper/transcribe.py#L187
class TranscriptionInferenceOptions(NamedTuple):
    audio: Union[str, BinaryIO, np.ndarray]
    language: str = "en"
    task: str = "transcribe"
    best_of: int = 5
    beam_size: int = 5
    patience: float = 1
    length_penalty: float = 1
    suppress_tokens: Optional[List[int]] = [-1]
    initial_prompt: str = None
    condition_on_previous_text: bool = True
    compression_ratio_threshold: float = 2.4
    log_prob_threshold: float = -1.0
    no_speech_threshold: float = 0.6
    word_timestamps: bool = True
    prepend_punctuations: str = "\"'“¿([{-"
    append_punctuations: str = "\"'.。,，!！?？:：”)]}、"
    vad_filter: bool = False
    vad_parameters: dict = None


class DiarizarionOptions(NamedTuple):
    enabled: bool = True
    device: Optional[Union[str, torch.device]] = "cpu"
    num_speakers: int = None
    min_speakers: int = None
    max_speakers: int = None


class TransciptionOutputOptions(NamedTuple):
    output_file_name: str
    output_dir: str
    output_formats: list[str] = ["all"]
    include_speaker: bool = True
    highlight_words: bool = False
    max_line_width: int = None
    max_line_count: int = None


class TranscriptionRequest(NamedTuple):
    model_options: FasterWhisperModelOptions
    inference_options: TranscriptionInferenceOptions
    output_options: TransciptionOutputOptions
    diarization_options: DiarizarionOptions


class TranscriptionResult(NamedTuple):
    segments: Iterable[Segment]
    info: TranscriptionInfo


class CustomWord:
    def __init__(self, start, end, word, probability):
        self.start = start
        self.end = end
        self.word = word
        self.probability = probability

    def to_dict(self):
        return self.__dict__


class CustomSegment:
    def __init__(
        self,
        id,
        seek,
        start,
        end,
        text,
        tokens,
        temperature,
        avg_logprob,
        compression_ratio,
        no_speech_prob,
        words,
    ):
        self.id = id
        self.seek = seek
        self.start = start
        self.end = end
        self.text = text
        self.tokens = tokens
        self.temperature = temperature
        self.avg_logprob = avg_logprob
        self.compression_ratio = compression_ratio
        self.no_speech_prob = no_speech_prob
        self.words = [self.deserialize_word(word).to_dict() for word in words]

    def deserialize_word(self, input_word):
        return CustomWord(
            start=input_word.start,
            end=input_word.end,
            word=input_word.word,
            probability=input_word.probability,
        )

    def to_dict(self):
        return self.__dict__


def deserialize_segment(segment):
    return CustomSegment(
        id=segment.id,
        seek=segment.seek,
        start=segment.start,
        end=segment.end,
        text=segment.text,
        tokens=segment.tokens,
        temperature=segment.temperature,
        avg_logprob=segment.avg_logprob,
        compression_ratio=segment.compression_ratio,
        no_speech_prob=segment.no_speech_prob,
        words=segment.words,
    )
