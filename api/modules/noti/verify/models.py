from django.db import models

# Create your models here.

class Verify(models.Model):
    uid = models.CharField(max_length=128)
    code = models.CharField(max_length=128)
    target = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} : {}".format(self.target, self.code, self.uid)

    class Meta:
        db_table = "verification"
        ordering = ["-id"]

