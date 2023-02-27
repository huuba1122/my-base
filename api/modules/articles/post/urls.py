import os
from django.urls import path

from .views.crud import PostViewSet

app_name = os.getcwd().split(os.sep)[-1]

BASE_ENDPOINT = PostViewSet.as_view({
    "get": "list",
    "post": "add",
})
PK_ENDPOINT = PostViewSet.as_view({
    "get": "retrieve",
    "put": "change",
    "delete": "delete",
})


urlpatterns = [
   path("", BASE_ENDPOINT),
   path("<int:pk>/", PK_ENDPOINT)
]