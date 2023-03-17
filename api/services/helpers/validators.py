import re
from django.core.validators import validate_email

class Validators:
    @staticmethod
    def check_valid_mail(email):
        try:
            validate_email(email)
            return True
        except Exception:
            return False
    

    @staticmethod
    def check_valid_phone_number(phone_number):
        if not phone_number:
            return False
        # The pattern just only matches with phone numbers in Vietnam
        pattern = '^((\+84|0)(3|5|7|8|9|24|28|2\d{2}))([0-9]{8})$'
        m = re.fullmatch(pattern, phone_number)
        return bool(m)
