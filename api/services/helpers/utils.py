import re
import uuid
import random
import string
from datetime import datetime


from django.utils.text import slugify
from django.conf import settings

class Utils:

    @staticmethod
    def now():
        return datetime.now()

    @staticmethod
    def str_to_date(date, format="%y-%m-%d"):
        return datetime.strptime(date, format)

    @staticmethod
    def generate_uid():
        return uuid.uuid4()

    @staticmethod
    def generate_otp_code(length=6):
        digits = "0123456789"
        return "".join([random.choice(digits) for _ in range(length)])
    
    @staticmethod
    def get_random_string(size=6):
        chars = string.ascii_lowercase + string.digits
        return ''.join(random.choice(chars) for _ in range(size))

    @staticmethod
    def generate_slug(title):
        if not title:
            return ""
        return slugify(title)

    @staticmethod
    def get_filetype_from_filename(filename):
        if not filename:
            return ""
        return filename.split(".")[-1]
    
    @staticmethod
    def get_transfer_data_source(key, title, description=""):
        return dict(
            key=str(key or ""),
            title=str(title or ""),
            description=str(description or ""),
        )


    @staticmethod
    def phone_to_local_format(phone_number):
        if not phone_number:
            return ""
        prefix = phone_number[:3]
        if prefix == "+84":
            return f"0{phone_number[3:]}"
        return phone_number

    @staticmethod
    def phone_to_canonical_format(phone_number):
        if not phone_number:
            return ""
        phone_number = phone_number.replace(" ", "")
        phone_number = phone_number.strip()

        prefix = phone_number[:4]
        if prefix == "+840":
            return f"+84{phone_number[4:]}"

        prefix = phone_number[:1]
        if prefix == "0":
            return f"+84{phone_number[1:]}"

        return phone_number
    
    @staticmethod
    def build_full_url(url):
        if type(url) == str and not re.search("^(http|https):\/\/(\S+)", url):
            return f"{settings.DOMAIN}/{url.lstrip('/')}"
        return url
