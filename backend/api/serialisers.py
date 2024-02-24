from rest_framework.serializers import ModelSerializer
from .models import Asset


class AssetSerialiser(ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"