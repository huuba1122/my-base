from django.db import models

# apps
from services.models.timestamped_model import TimeStampedModel
from services.helpers.utils import Utils


class Category(TimeStampedModel):
    title = models.CharField(max_length=128, unique=True)
    is_menu = models.BooleanField(default=False)
    is_single = models.BooleanField(default=True)
    slug = models.SlugField(max_length=128, blank=True)

    parent = models.ForeignKey(
        'self',
        related_name="sub_categories",
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_slug(self.title)
        return super().save(*args, **kwargs)


    def __str__(self):
        return f"#{self.pk}: {self.title}"

    class Meta:
        db_table = "categories"
        ordering = ["-id"]
