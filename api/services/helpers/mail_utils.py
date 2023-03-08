import asyncio
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


class EmailUtils:
    from_email = settings.EMAIL_HOST_USER

    @staticmethod
    def get_loop():
        def create_looop():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            return loop

        try:
            loop = asyncio.get_event_loop()
            if loop.is_closed():
                loop = create_looop()
        except Exception:  # skipcq: whatever error
            loop = create_looop()

        return loop

    @staticmethod
    def send_email(subject, body, to_email):
        try:
            email = EmailMultiAlternatives(
                subject,
                body,
                EmailUtils.from_email,
                to_email
            )
            email.content_subtype = 'html'
            email.attach_alternative(body, 'text/html')
            return email.send()
        except Exception as e:
            print('Error sending email', repr(e))
            return e
    
    @staticmethod
    def send_email_async(*args):
        EmailUtils.async_exec(EmailUtils.send_email, *args)

    @staticmethod
    def async_exec(func, *args):
        EmailUtils.get_loop().run_in_executor(None, func, *args)

