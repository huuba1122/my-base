from django.conf import settings
from datetime import datetime
from django.utils.translation import gettext as _
from django.template.loader import render_to_string

from services.helpers.utils import Utils
from services.helpers.mail_utils import EmailUtils
from ..models import Verify


class VerifyUtils:

    @staticmethod
    def is_expired(verify_obj):
        if not verify_obj:
            return True
        current_time = datetime.now()
        diff = current_time - verify_obj.updated_at
        diff_seconds = diff.total_seconds()
        if diff_seconds > settings.DEFAULT_VERIFY_CODE_EXPIRED_PERIOD:
            return True
        return False


    @staticmethod
    def create(target):
        uid = Utils.generate_uid()
        code = Utils.generate_otp_code()
        
        return Verify.objects.create(uid=uid, code=code, target=target)


    @staticmethod
    def recreate(uid):
        try:
            item = Verify.objects.get(uid=uid)
            if not VerifyUtils.is_expired(item):
                err_message = _("The OTP code is still valid, please check your email")
                return (None, err_message)

            return (item, "")
        except Exception as e:
            print("Error recreating the OTP code", repr(e))
            err_message = _("Can not send OTP, please try again after 90 seconds")
            return (None, err_message)


    @staticmethod
    def check_otp(uid, code):
        result_err = (False, None)
        try:
            if not uid or not code:
                return result_err
            item = Verify.objects.get(uid=uid, code=code)
            if VerifyUtils.is_expired(item):
                return result_err

            return (True, item)
        except Verify.DoesNotExist:
            return result_err

    @staticmethod
    def create_and_send_otp_reset_password(target):
        try:
            verify = VerifyUtils.create(target)
            VerifyUtils.send_otp_reset_password(verify.code, target)

            return (True, verify)
        except Exception as e:
            print('send opt error', repr(e))
            err_message = _("Can not send OTP, please try again")
            return (False, err_message)

    @staticmethod
    def send_otp_reset_password(otp_code, to_mail):
        subject = settings.APP_TITLE
        body = render_to_string(
            'noti/reset_pwd/vi.html',
            { "otp_code" : otp_code }
        )
        EmailUtils.send_email_async(subject, body, to_mail)
        # EmailUtils.send_email_async(subject, body, ['hahuuba@zen8labs.com'])
        

