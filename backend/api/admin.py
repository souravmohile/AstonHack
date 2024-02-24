from django.contrib import admin
from .models import Asset, Player, HighScore


admin.site.register(Asset)
admin.site.register(Player)
admin.site.register(HighScore)