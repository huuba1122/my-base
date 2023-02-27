from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .utils import Utils

User = get_user_model()

class JWTUtils:

    @staticmethod
    def get_request_token(request):
        full_token = request.META.get('HTTP_AUTHORIZATION')
        token =  full_token.split(" ")[-1] if full_token else ""
        return token

    @staticmethod
    def get_token_signature(access_token):
        return access_token.split(".")[-1]

    @staticmethod
    def get_user_from_token(access_token):
        try:
            jwt_object = JWTAuthentication()
            validate_token = jwt_object.get_validated_token(access_token)
            return jwt_object.get_user(validate_token)
        except Exception as e:
            print('get user error',repr(e))
            return None

    @staticmethod
    def is_revoked(access_token):
        if not access_token:
            return True

        token_signature = JWTUtils.get_token_signature(access_token)
        is_exists =  User.objects.filter(token_signature=token_signature).exists()
        return not is_exists

    @staticmethod
    def refresh_token(refresh_token):
        try:
            access_token = RefreshToken(refresh_token).access_token
            return str(access_token)
        except Exception:
            return ""

    @staticmethod
    def update_user_token_signature(user, token_signature):
        user.token_signature = token_signature
        user.save()
