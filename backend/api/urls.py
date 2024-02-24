from django.urls import path
from . import views


urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('assets/', views.assets, name='assets'),
    path('asset/<int:pk>', views.asset, name="asset"),
    path('highscores/', views.high_scores, name="high_scores"),
    path('highscores/<int:num_returned>', views.high_scores, name="high_scores"),
    path('highscore/<int:player_id>', views.high_score, name="high_score"),
]