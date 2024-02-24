from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from .serialisers import AssetSerialiser
from .models import Asset


@api_view(["GET"])
def hello(request):
    hello = {"hello": "there"}
    return Response(hello)


@api_view(["GET"])
def assets(request):
    assets = Asset.objects.all()
    serialiser = AssetSerialiser(assets, many=True)
    return Response(serialiser.data)