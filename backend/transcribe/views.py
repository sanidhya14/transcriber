from .models import TranscriptionJobHistory
from django.http import JsonResponse
import json
from django.core.serializers import serialize

def list_transcription_jobs(request):
    objects = TranscriptionJobHistory.objects.all()
    return JsonResponse({"jobs": serialize('json', objects)})
