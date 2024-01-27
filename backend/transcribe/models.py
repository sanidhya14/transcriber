from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_json(value):
    try:
        import json
        json.loads(value)
    except (json.JSONDecodeError, TypeError):
        raise ValidationError(
            _('Enter valid JSON.'),
            code='invalid',
        )

def validate_speaker_map(value):
    if not isinstance(value, dict):
        raise ValidationError("SpeakerMap must be a dictionary.")

    for key, speaker_map in value:
        if not isinstance(speaker_map, dict):
            raise ValidationError("Each item in child SpeakerMap must be a dictionary.")

        # Check if there are exactly two keys
        if len(speaker_map) != 2:
            raise ValidationError("Each item in child SpeakerMap must have exactly two keys.")

        # Check if 'speakerId' and 'speakerName' keys are present
        if "speakerId" not in speaker_map or "speakerName" not in speaker_map:
            raise ValidationError(
                "Each item in child SpeakerMap must have 'speakerId' and 'speakerName' keys."
            )

        # Check if 'speakerId' and 'speakerName' values are strings
        if not (
            isinstance(speaker_map["speakerId"], str)
            and isinstance(speaker_map["speakerName"], str)
            and isinstance(key, str)
        ):
            raise ValidationError(
                "Values of 'speakerId' and 'speakerName' and top key in SpeakerMap must be strings."
            )


class TranscriptMetadata(models.Model):
    transcriptionId = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    sourceLanguage = models.CharField(max_length=255)
    speakerMap = models.JSONField(validators=[validate_json, validate_speaker_map])
    durationInSeconds = models.FloatField()
    audioFormat = models.CharField(max_length=255)
    createdTimestamp = models.TimeField()
    updatedTimestamp = models.TimeField()
    status = models.CharField(max_length=255)
    runMode = models.CharField(max_length=255)


def validate_transcript_segments(value):
    if not isinstance(value, dict):
        raise ValidationError("Transcript Segment must be a dictionary.")

    # Check if the required keys are present within the nested dictionary
    required_keys = ["speakerId", "startTimeInSeconds", "endTimeInSeconds", "text"]
    for key in required_keys:
        if key not in value:
            raise ValidationError(f"Transcript Segment must have '{key}' key.")

    # Check data types for keys within the nested dictionary
    if not (
        isinstance(value["speakerId"], str)
        and isinstance(value["startTimeInSeconds"], str)
        and isinstance(value["endTimeInSeconds"], str)
        and isinstance(value["text"], str)
    ):
        raise ValidationError("Values of keys in Transcript Segment must be strings.")


class Transcript(models.Model):
    transcriptionId = models.CharField(max_length=255)
    startTimeInSeconds = models.FloatField()
    transcriptSegment = models.JSONField(
        validators=[validate_json, validate_transcript_segments]
    )
    class Meta:
        unique_together = (('transcriptionId', 'startTimeInSeconds'))
