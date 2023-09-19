from django.urls import path
from .views import create_user, login_and_get_api_key

urlpatterns = [
    path('create-user/', create_user, name='create_user'),
    path('log-in', login_and_get_api_key, name='log-in'),
]