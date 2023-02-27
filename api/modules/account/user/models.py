from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(max_length=128, unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=128, unique=True, null=True, blank=True)
    token_signature = models.CharField(max_length=255, blank=True, null=True)

    @property
    def full_name(self):
        return f"{self.last_name} {self.first_name}".strip()
    
    def __str__(self):
        return f"{self.id}-{self.email}"
    

    class Meta:
        db_table = "users"
        ordering = ["-id"]