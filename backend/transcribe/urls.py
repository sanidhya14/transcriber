from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'transcribe/', consumers.TranscribeConsumer.as_asgi()),
]