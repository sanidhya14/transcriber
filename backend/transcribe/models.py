from django.db import models

class TranscriptionJobHistory(models.Model):
    transcriptionId = models.CharField(max_length=255, primary_key=True)
    runMode = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    startDate = models.CharField(max_length=255)
    endDate = models.CharField(max_length=255)
    context = models.TextField()

class TranscriptMetadata(models.Model):
    transcriptionId = models.CharField(max_length=255, primary_key=True)
    sourceLanguage =  models.CharField(max_length=255)
    createdTimestamp = models.TimeField()
    updatedTimestamp = models.TimeField()
    transcriptFileLocation = models.FileField(upload_to='files/')
    audioMetadataKey = models.CharField(max_length=255)

class AudioMetadata(models.Model):
    audioId = models.CharField(max_length=255, primary_key=True)
    audioFileLocation = models.FileField(upload_to='files/')
    durationInSeconds = models.FloatField()
    audioFormat = models.CharField(max_length=255)