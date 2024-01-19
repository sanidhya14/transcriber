from faster_whisper import WhisperModel
from .transcriptionModels import TranscriptionInferenceOptions, TranscriptionResult, FasterWhisperModelOptions

def transcribe_with_faster_whisper(
        model: WhisperModel,
        inference_options: TranscriptionInferenceOptions
    ) -> TranscriptionResult:

    segments, info = model.transcribe(
        inference_options.audio,
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
        vad_filter=inference_options.vad_filter,
        vad_parameters=inference_options.vad_parameters,
    )
    # The transcription will actually run here
    segments = list(segments)
    return TranscriptionResult(segments=segments, info=info)

def get_model_instance(
        model_options: FasterWhisperModelOptions
    ) -> WhisperModel:
    
    return WhisperModel(
        model_size_or_path=model_options.model_size,
        device=model_options.device,
        device_index=model_options.device_index,
        compute_type=model_options.compute_type,
        cpu_threads=model_options.cpu_threads,
        num_workers=model_options.num_workers,
        download_root=model_options.download_root,
        local_files_only=model_options.local_files_only,
    )
