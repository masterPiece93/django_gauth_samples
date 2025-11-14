from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class CacheControlStaticMiddleware(MiddlewareMixin):
    """
    NOTE: Not Working as expected , need to work on it
    """

    def process_response(self, request, response):
        if request.path.startswith(settings.STATIC_URL) and response.status_code == 200:
            response["Cache-Control"] = "must-revalidate"
        return response
