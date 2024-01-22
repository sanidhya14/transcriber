from channels.routing import ProtocolTypeRouter, URLRouter
from . import consumers
from django.urls import re_path

application = ProtocolTypeRouter(
    {
        "websocket": URLRouter([
            re_path(r"execute/", consumers.TranscribeConsumer.as_asgi()),
        ]),
    }
)
