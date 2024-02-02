from ...models import TranscriptMetadata, TranscriptSegment
from ...constants import response_codes
from django.utils import timezone
import json


def create_transcript_metadata(request_id: str, params: dict):
    transcript_metadata = TranscriptMetadata(
        transcriptionId=request_id,
        title="Untitled",
        sourceLanguage=params.get("sourceLanguage", "undefined"),
        speakerMap={"speakerId": "undefined", "speakerName": "undefined"},
        durationInSeconds=params.get("durationInSeconds", 0),
        audioFormat=params.get("audioFormat", "undefined"),
        createdTimestamp=timezone.now().strftime("%H:%M:%S"),
        updatedTimestamp=timezone.now().strftime("%H:%M:%S"),
        status=response_codes.TRANSCRIPTION_JOB_INITIALIZED,
        runMode="Async",
    )
    transcript_metadata.save()


def update_transcript_metadata(request_id: str, params: dict):
    transcript_metadata = TranscriptMetadata.objects.get(
        transcriptionId=request_id,
    )
    for key, value in params.items():
        setattr(transcript_metadata, key, value)
    transcript_metadata.save()


def create_transcript_segment(request_id: str, params: dict):
    transcriptSegment = TranscriptSegment(
        transcriptionId=request_id,
        startTimeInSeconds=params.get("startTimeInSeconds", 0.0),
        transcriptSegment=params.get(
            "transcriptSegment",
            {
                "speakerId": "",
                "startTimeInSeconds": "",
                "endTimeInSeconds": "",
                "text": "",
            },
        ),
    )
    transcriptSegment.save()


def update_transcript_segment(request_id: str, params: dict):
    transcriptSegment = TranscTranscriptSegmentript.objects.get(
        transcriptionId=request_id,
    )
    for key, value in params.items():
        setattr(job_history, key, value)
    transcriptSegment.save()
