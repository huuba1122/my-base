import os
from django.urls import path

from .views.crud import CategoryViewSet

app_name = os.getcwd().split(os.sep)[-1]
BASE_ENDPOINT = CategoryViewSet.as_view({
    "get": "list",
    "post": "add"
})
PK_ENDPOINT = CategoryViewSet.as_view({
    "get": "retrieve",
    "put": "change",
    "delete": "delete",
})

urlpatterns = [
    path("", BASE_ENDPOINT),
    path("<int:pk>/", PK_ENDPOINT)
]