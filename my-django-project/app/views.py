"""UI
This is the UI counterpart of the
    demonstration system

Here it is server rendered UI
    that we have created .

But it is demonstrating the concepts
    well enough so that a UI that is 
    impmented in React / Angular / Vue 
    can easily see this UI implementation
    and integate django-gauth based routes
    in their pages .
"""
from django.shortcuts import render
from django.urls import reverse
from django_gauth.utilities import check_gauth_authentication

__title__ = "Demonstration App"


def home_view(request):
    """
    ui landing page
        - demonstarates default LANDING_PAGE login scheme
        - link to `user_view`
        - link to `user_bio_view`
    [UI Component]
    """
    is_authenticated, _ = check_gauth_authentication(request.session)
    context: dict = {
        "title": __title__,
        "login_href": reverse("django_gauth:login"),
        "is_google_authenticated": is_authenticated,
    }
    return render(request, "base.html", {"context_data": context})


def user_view(request, name: str, age: int):  # type: ignore
    """
    ui user view page
        - demonstarates ORIGIN_PRESERVE_QPA login scheme
    [UI Component]
    """
    is_authenticated, _ = check_gauth_authentication(request.session)
    context: dict = {
        "title": __title__,
        "page_title": "User View",
        "login_href": reverse("django_gauth:login"),
        "user_data": {"name": name, "age": age},
        "is_google_authenticated": is_authenticated,
    }
    return render(request, "user_view.html", {"context_data": context})


def user_bio_view(request, name: str, age: int, job: str, sex: str):  # type: ignore
    """
    ui user bio page
        - demonstarates ORIGIN_PRESERVE_HPA login scheme
    [UI Component]
    """
    is_authenticated, _ = check_gauth_authentication(request.session)
    context: dict = {
        "title": __title__,
        "page_title": "User Bio",
        "login_href": reverse("django_gauth:login"),
        "login_url": request.build_absolute_uri(reverse("django_gauth:login")),
        "user_data": {"name": name, "age": age, "job": job, "sex": sex},
        "is_google_authenticated": is_authenticated,
    }
    return render(request, "user_bio.html", {"context_data": context})
