from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
from services.helpers.utils import Utils
from services.helpers.validators import Validators

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
        
        if "phone_number" in data:
            phone_number = data.get("phone_number")
            phone_number = Utils.phone_to_canonical_format(phone_number)
            if not phone_number:
                phone_number = None
            elif not Validators.check_valid_phone_number(phone_number):
                raise serializers.ValidationError({"phone_number": "Phone number is not valid!"})

            data["phone_number"] = phone_number

        return super().to_internal_value(data)

    def to_representation(self, obj):
        return {
            "id": obj.pk,
            "full_name": obj.full_name,
            "is_active": obj.is_active,
            "is_staff": obj.is_staff,
        }
