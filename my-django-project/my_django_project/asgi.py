import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from app import (
    consumers,
)  # Assuming you have a consumers.py file for WebSocket handling

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_django_project.settings")
django.setup()

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    # Define your WebSocket URL patterns here
                    # path('ws/some_path/', consumers.YourConsumer.as_asgi()),
                ]
            )
        ),
    }
)
