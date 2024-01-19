from django.test import TestCase

# Create your tests here.

input_payload = {
  "model_options": {
    "model_size": "tiny",
    "device": "cpu"
  },
  "inference_options": {
    "audio": "/Users/khajuri/Desktop/projectx/transcriber/backend/resources/audio.m4a"
  },
  "output_options": {
    "output_file_name": "result-v2",
    "output_dir": "/Users/khajuri/Desktop/projectx/transcriber/backend/resources/outputs"
  }
}

