from django.db import models


class Asset(models.Model):
    name = models.CharField(null=False, blank=False, max_length=30)
    image = models.ImageField(null=False, blank=False, upload_to="game_assets/")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.image.url}"