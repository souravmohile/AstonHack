from django.db import models
from django.conf import settings
import os


class Asset(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    image_path = models.FilePathField(path=os.path.join(settings.MEDIA_ROOT, "game_assets"), null=False, blank=False)

    def __str__(self):
        return f"{self.name} - {self.image_path}"


class Player(models.Model):
    # p_id is determined by the user's cookie data (tbc)
    player_id = models.CharField(max_length=64, primary_key=True)


class HighScore(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    score = models.IntegerField(null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)