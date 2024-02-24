from django.db import models
from django.conf import settings
import os


class Asset(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    image_path = models.FilePathField(path=os.path.join(settings.MEDIA_ROOT, "game_assets"), null=False, blank=False)

    def __str__(self):
        return f"{self.name} - {self.image_path}"