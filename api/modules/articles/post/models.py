import os
import uuid

from django.db import models

# apps
from services.models.timestamped_model import TimeStampedModel
from services.helpers.utils import Utils
from modules.account.staff.models import Staff
from modules.articles.category.models import Category
from .helpers.consts import POST_STATUS_CHOICES, PostStatus

def img_dest(instance, filename):
    ext = filename.split(".")[-1]
    return os.path.join("banner", f"{uuid.uuid4()}.{ext}")


class Post(TimeStampedModel):
    uid = models.CharField(max_length=128, unique=True)
    title = models.CharField(max_length=256)
    banner = models.ImageField(upload_to=img_dest, null=True, blank=True)
    body = models.TextField()
    description = models.TextField(null=True, blank=True)
    slug = models.SlugField(max_length=256, null=False, unique=True, blank=True)
    on_menu = models.BooleanField(default=False)
    status = models.IntegerField(choices=POST_STATUS_CHOICES, blank=True, default=PostStatus.PENDING)

    author = models.ForeignKey(
        Staff,
        null=True,
        related_name="posts",
        on_delete=models.SET_NULL,
    )

    categories = models.ManyToManyField(Category, related_name="posts", blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_slug(self.title)
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.pk}: {self.title}"

    class Meta:
        db_table = "posts"
        ordering = ["-id"]
