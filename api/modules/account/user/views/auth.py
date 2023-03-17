from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.translation import gettext as _
from django.contrib.auth.hashers import check_password, make_password

# libs
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView


# modules
from services.helpers.jwt_utils import JWTUtils
from services.helpers.mail_utils import EmailUtils
from services.helpers.utils import Utils
from modules.noti.verify.helpers.utils import VerifyUtils
from ..models import User
from ..helpers.utils import UserUtils


class LoginView(TokenObtainPairView):
    """
    Return access token and refresh token
    """
    permission_classes =(AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            LoginView.handle_user_login(token)

            data = {
                "token": token,
                "refresh_token": refresh_token
            }
            return Response(data)

        except AuthenticationFailed:
            message = _('Invalid Username or Password!')
            return Response({ "detail" : message }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('error',repr(e))
            message = _('User not found!')
            return Response({ "detail" : message }, status=status.HTTP_404_NOT_FOUND)

    @staticmethod
    def handle_user_login(token):
        token_signature = JWTUtils.get_token_signature(token)
        user = JWTUtils.get_user_from_token(token)
        user.last_login = Utils.now()
        JWTUtils.update_user_token_signature(user, token_signature)



class LogoutView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            token = JWTUtils.get_request_token(request)
            user = JWTUtils.get_user_from_token(token)
            JWTUtils.update_user_token_signature(user, "")
        except Exception:
            pass
    
        return Response({})



class RefreshTokenView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh_token')
        new_access_token = JWTUtils.refresh_token(refresh_token)
        if not new_access_token:
            err_message = _("Can't refresh token!")
            return Response({ "detail" : err_message }, status=status.HTTP_401_UNAUTHORIZED)

        user = JWTUtils.get_user_from_token(new_access_token)
        if not user or not user.token_signature:
            err_message = _("Token is invalid or expired")
            return Response({ "detail" : err_message }, status=status.HTTP_401_UNAUTHORIZED)
        
        token_signature = JWTUtils.get_token_signature(new_access_token)
        JWTUtils.update_user_token_signature(user, token_signature)

        return Response({ "token" : new_access_token })



class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        user = request.user
        params = request.data

        old_password = params.get('old_password', '')
        password = params.get('password', '')
        confirm_password = params.get('confirm_password', '')

        if password != confirm_password:
            return Response(
                {"password_confirm": _("Password and confirm password didn't match")},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not old_password or not check_password(old_password, user.password):
            return Response(
                {"old_password": _("Incorrect current password")},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.password = make_password(password)
        user.save()

        return Response({})        



class ResetPasswordView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        params = request.data

        username = params.get('username')
        verify_id = params.get('verify_id')
        otp_code = params.get('otp_code')
        password = params.get('password')
        confirm_password = params.get('confirm_password')

        if not verify_id:
            invalid_username_msg = { "detail": "Invalid username" }
            user = UserUtils.get_user_by_username(username)
            if not user:
                return Response(
                    invalid_username_msg, status=status.HTTP_400_BAD_REQUEST
                )
            
            ok, result = VerifyUtils.create_and_send_otp_reset_password(username)
            if ok:
                return Response({"verify_id": result.uid})

            return Response(
                {"detail": result},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if password != confirm_password:
            return Response(
                {"detail": "Password and confirm password didn't match"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ok, verify_item = VerifyUtils.check_otp(verify_id, otp_code)
        if not ok:
            return Response(
                {"detail": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = UserUtils.get_user_by_username(verify_item.target)
        user.set_password(password)
        user.save()     
        return Response({})       


# ----------------------------------------------------------------
class TestView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        message = 'Test puplic api view success!!'
        return Response(message)

class TestAuthView(APIView):

    def get(self, request, *args, **kwargs):
        message = 'Test auth api view success!!'
        return Response(message)


class TestSendMailView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        message = 'Test send mail message!!'
        subject = 'Test send mail subject'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['hahuuba@zen8labs.com',]
        try:
            send_mail( subject, message, email_from, recipient_list )
        except Exception as e:
            print('send mail error', repr(e))
            return Response(e)

        return Response(message)


class TestSendTemplateMailView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, *args, **kwargs):
        subject = 'Test email subject'
        email_body = render_to_string(
                "noti/test_mail.html",
                { "username": 'Mr Black' }
            )

        to_email = 'hahuuba@zen8labs.com'
        result = EmailUtils.send_email(subject, email_body, [to_email])
        return Response(result)
