from django.shortcuts import render
from django.http import (  # pylint: disable=import-error
    HttpRequest,
    HttpResponseBadRequest,
    JsonResponse,
    HttpResponse
)
# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from django_gauth import gauth_required


class PingViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that responds with a ping message.
    """
    # # UnSupported in DRF 
    # #   - the @gauth_required decorator is not supported in DRF viewsets, 
    # #       so we will use it in the individual methods instead.
    # @gauth_required(response="json")   # 401 JSON instead of a redirect
    def list(self, request):
        print(request.user)  # This will print the authenticated user to the console
        return Response({"message": "pong"})

def ping(request):
    return JsonResponse({"message": "pong"})

@gauth_required(response="redirect")
def docs(request):
    print(type(request))  # This will print the type of the authenticated user to the console
    html_content = "<h1>API Documentation</h1><p>This is the API documentation.</p>"
    return HttpResponse(html_content)

@gauth_required(response="json")   # 401 JSON instead of a redirect
def me(request):
    print(request.user)  # This will print the authenticated user to the console
    print(request.user.is_authenticated)  # This will print True if the user is authenticated
    print(request.user.email)  # This will print the email of the authenticated user
    print(request.user.first_name)  # This will print the first name of the authenticated user
    print(request.user.last_name)  # This will print the last name of the authenticated user
    print(request.user.get_full_name())  # This will print the full name of the authenticated user
    print(request.user.get_username())  # This will print the username of the authenticated user
    print(request.user.is_staff)  # This will print True if the user is a staff member
    print(request.user.is_superuser)  # This will print True if the user is a superuser
    print(request.user.is_active)  # This will print True if the user is active
    print(request.user.date_joined)  # This will print the date the user joined
    print(request.user.last_login)  # This will print the last login date of the user
    print(request.user.groups.all())  # This will print the groups the user belongs to
    print(request.user.user_permissions.all())  # This will print the permissions the user has
    return JsonResponse({
        "email": request.user.email,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
        "full_name": request.user.get_full_name(),
        "username": request.user.get_username(),
        "is_staff": request.user.is_staff,
        "is_superuser": request.user.is_superuser,
        "is_active": request.user.is_active,
        "date_joined": request.user.date_joined.isoformat() if request.user.date_joined else None,
        "last_login": request.user.last_login.isoformat() if request.user.last_login else None,
        "groups": [group.name for group in request.user.groups.all()],
        "permissions": [perm.codename for perm in request.user.user_permissions.all()],
    })

@gauth_required(response="json")
def markdown_to_html(request: HttpRequest):
    """
    Convert Markdown text to HTML.
    """
    import markdown
    markdown_text = request.body.decode("utf-8")
    html_content = markdown.markdown(markdown_text, extensions=['extra', 'toc', 'codehilite', 'tables', 'fenced_code'], extension_configs={'codehilite': {'css_class': 'highlight'}})
    return HttpResponse(html_content)
