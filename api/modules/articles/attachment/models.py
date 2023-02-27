import os
import uuid

from django.db import models

# apps
from services.models.timestamped_model import TimeStampedModel
from modules.articles.post.models import Post

def file_dest(instance, filename):
    ext = filename.split(".")[-1]
    return os.path.join("attachments", f"{uuid.uuid4()}.{ext}")


class Attachment(TimeStampedModel):
    title = models.CharField(max_length=128, blank=True, default="")
    file = models.FileField(upload_to=file_dest)
    mine_type = models.CharField(max_length=64, blank=True, default="")
    post_uid = models.CharField(max_length=128, blank=True, default="")
    in_content = models.BooleanField(default=False, blank=True)

    post = models.ForeignKey(
        Post,
        blank=True,
        null=True,
        related_name="attachments",
        on_delete=models.CASCADE,
    )
    

    def __str__(self):
        return f"#{self.pk}: {self.title}"

    class Meta:
        db_table = "attachments"
        ordering = ["-id"]