import os
from django.urls import path

app_name = os.getcwd().split(os.sep)[-1]

from .views.custom import SendOTPView


urlpatterns = [
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
]