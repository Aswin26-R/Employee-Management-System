from django.urls import path
from .views import ProfileAPIview

urlpatterns = [
    path("profile/", ProfileAPIview.as_view(), name = "profile")
]
