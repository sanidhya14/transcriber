from django.test import TestCase

input_payload = {
    "model_options": {"model_size": "tiny", "device": "cpu"},
    "inference_options": {"audio": "/Users/khajuri/Desktop/projectx/got.m4a"},
    "output_options": {
        "output_file_name": "result-v2",
        "output_dir": "/Users/khajuri/Desktop/projectx/outputs/v2",
        "output_formats": ["txt", "srt", "json", "vtt", "tsv"],
        "include_speaker": true,
    },
    "diarization_options": {
        "enabled": true,
        "device": "cpu",
        "min_speakers": 1,
        "max_speakers": 3,
    },
}
