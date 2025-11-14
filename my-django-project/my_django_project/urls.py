from django.urls import path, include
from app import views

urlpatterns = [
    path("", views.home_view, name="home"),
    path("user/<str:name>/with-age/<int:age>", views.user_view, name="user_info"),
    path(
        "user/<str:name>/with-age/<int:age>/job/<str:job>/sex/<str:sex>",
        views.user_bio_view,
        name="user_bio",
    ),
    path("gauth/", include("django_gauth.urls")),
]
