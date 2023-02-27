import json
import contextlib
from django.http import JsonResponse
from django.utils.translation import gettext as _

# libs
from rest_framework.permissions import AllowAny

# modules
from services.helpers.jwt_utils import JWTUtils


class JWTAuthentication:

    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self,request):
        response = self.get_response(request)
        return response
    
    def process_view(self, request, view_func, view_args, view_kwargs): 
        token = JWTUtils.get_request_token(request)

        if token:
            with contextlib.suppress(AttributeError):
                view_permissions = view_func.view_class.permission_classes
                if AllowAny in view_permissions:
                    request.META.update({ "HTTP_AUTHORIZATION" : None })
                elif JWTUtils.is_revoked(token):
                    reponse_data = { "message" : _("Token is invalid or expired") }
                    return JsonResponse(reponse_data, status=401)
