from django.utils.translation import gettext as _

# lib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..helpers.utils import VerifyUtils


class SendOTPView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        return Response({"otp_code": '0123456'})


class CheckOTPView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        params = request.data

        verify_id = params.get('verify_id', "")
        otp_code = params.get('otp_code', "")
        
        error_message = _("Invalid OTP")

        if not verify_id or not otp_code:
            return Response({"detail": error_message})

        is_valid, obj = VerifyUtils.check_otp(verify_id, otp_code)
        if not is_valid:
            return Response({"detail": error_message})

        return Response(params)