from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http import HttpResponseNotFound, HttpResponseBadRequest
from .serialisers import AssetSerialiser, HighScoreSerialiser
from .models import Asset, HighScore


@api_view(["GET"])
def hello(request):
    hello = {"hello": "there"}
    return Response(hello)


@api_view(["GET"])
def assets(request):
    assets = Asset.objects.all()
    serialiser = AssetSerialiser(assets, many=True)
    return Response(serialiser.data)


@api_view(["GET"])
def asset(request, pk):
    assets = Asset.objects.filter(pk=pk)
    if not assets:
        return HttpResponseNotFound
    serialiser = AssetSerialiser(assets.first())
    return Response(serialiser.data)


@api_view(["GET"])
def high_scores(request, num_returned=5):
    high_scores = HighScore.objects.all().order_by('-score', 'timestamp')[:num_returned]
    serialiser = HighScoreSerialiser(high_scores, many=True)
    return Response(serialiser.data)


@api_view(["POST"])
def high_score(request):
    player_id = request.POST.get("player_id")
    score = request.POST.get("score")
    high_score = HighScore.objects.create(player=player_id, score=score)
    return Response({'message': 'High score submitted.'})