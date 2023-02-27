import os
from django.urls import path
from .views.auth import (
        TestView,
        TestAuthView,

        LoginView,
        LogoutView,
        TestSendMailView,
        RefreshTokenView,
        ResetPasswordView,
        ChangePasswordView,
        TestSendTemplateMailView,
    )


app_name = os.getcwd().split(os.sep)[-1]

urlpatterns = (
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="login"),
    path("refresh-token/", RefreshTokenView.as_view(), name="refresh_token"),
    path("change-pwd/", ChangePasswordView.as_view(), name="change_password"),
    path("reset-pwd/", ResetPasswordView.as_view(), name="reset_password"),

    path("test/", TestView.as_view(), name="test_api"),
    path("test-auth/", TestAuthView.as_view(), name="test_auth_api"),
    path("test-sendmail/", TestSendMailView.as_view(), name="test_send_mail"),
    path("send-template-mail/", TestSendTemplateMailView.as_view(), name="test_send_template_mail"),
)