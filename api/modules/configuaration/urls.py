import os
from django.urls import path

app_name = os.getcwd().split(os.sep)[-1]

from .views.custom import ConfigView


urlpatterns = [
     path("", ConfigView.as_view(), name="configuaration"),
]