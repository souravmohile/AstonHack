from rest_framework.serializers import ModelSerializer
from .models import Asset, HighScore


class AssetSerialiser(ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"


class HighScoreSerialiser(ModelSerializer):
    class Meta:
        model = HighScore
        fields = "__all__"