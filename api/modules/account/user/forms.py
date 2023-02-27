from django import forms
from django.contrib.auth.forms import (
    UserCreationForm,
    UserChangeForm,
)

from .models import User


class CustomUserCreationForm(UserCreationForm):
    # password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    # password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)
    email = forms.CharField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "class": "form-control",
            }
        ),
    )


    class Meta:
        model = User
        fields = ("email",)



class CustomUserChangeForm(UserChangeForm):
    email = forms.CharField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "class": "form-control",
            }
        ),
    )

    class Meta:
        model = User
        fields = ("email",)
