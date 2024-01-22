# transcribe/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("jobs/list/", views.list_transcription_jobs),
    path("jobs/create/", views.create_job),
]
