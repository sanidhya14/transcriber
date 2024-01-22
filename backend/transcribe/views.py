from .models import TranscriptionJobHistory
from django.http import HttpResponse

def list_transcription_jobs(request):
    obj = TranscriptionJobHistory.objects.get(transcriptionId="test-id-1")
    return HttpResponse("<h1>Page was found & Object id is {}</h1>".format(obj.transcriptionId))

def create_job(request):
    obj = TranscriptionJobHistory(transcriptionId="test-id-1", runMode="Async", status="IN_PROGRESS", context="null")
    obj.save()
    return HttpResponse("<h1>Page was found</h1>")
