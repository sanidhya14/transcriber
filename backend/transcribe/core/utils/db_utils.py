from ...models import TranscriptionJobHistory
from ...constants import response_codes
import time
import json

def create_job_history(request_id: str):
    job_history = TranscriptionJobHistory(
        transcriptionId=request_id,
        runMode="Async",
        status=response_codes.TRANSCRIPTION_JOB_INITIALIZED,
        startDate=json.dumps(time.time()),
    )
    job_history.save()


def update_job_history(request_id: str, params: dict):
    job_history = TranscriptionJobHistory.objects.get(
        transcriptionId=request_id,
    )
    for key, value in params.items():
        setattr(job_history, key, value)
    job_history.save()
