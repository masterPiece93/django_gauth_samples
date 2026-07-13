# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PingViewSet, markdown_to_html, ping, me, docs

# Initialize the router and register the ViewSet
router = DefaultRouter()
router.register(r'ping', PingViewSet, basename='ping')

# Include the router URLs into the app patterns
urlpatterns = [
    path('', include(router.urls)),
    path("v2/ping", ping, name="ping_v2"),
    path("me", me, name="me"),
    path("markdown-to-html", markdown_to_html, name="markdown_to_html"),
    path("docs", docs, name="docs"),
]
