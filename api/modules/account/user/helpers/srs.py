from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

User = get_user_model()


class UserSr(ModelSerializer):
    class Meta:
        model = User
        exclude = []

    email = serializers.CharField(
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Duplicate email")
        ]
    )

    def to_internal_value(self, data):
        if "email" in data:
            email = data.get("email").lower()
            data["username"] = email
            data["email"] = email

        if "password" in data:
            data["password"] = make_password(data.get("password"))

        return super().to_internal_value(data)

    def to_representation(self, obj):
        return {
            "id": obj.pk,
            "full_name": obj.full_name,
            "is_active": obj.is_active,
            "is_staff": obj.is_staff,
        }
