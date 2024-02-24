from django.urls import path
from . import views


urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('assets/', views.assets, name='assets'),
    path('asset/<int:pk>', views.asset, name="asset")
]