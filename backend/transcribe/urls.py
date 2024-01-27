# transcribe/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("list/", views.list_transcripts),
    path("delete/", views.delete_transcripts),
    path("export/", views.export_transcripts),
    path("<str:transcriptionId>/get/", views.get_transcript_page),
    path("<str:transcriptionId>/update/", views.update_transcript),

    # Not for Production
    path("delete/all/", views.reset_db),
]
