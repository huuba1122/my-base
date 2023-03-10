import os
from django.urls import path
from .views.crud import RoleViewSet

app_name = os.getcwd().split(os.sep)[-1]

BASE_ENDPOINT = RoleViewSet.as_view(
    {"get": "list", "post": "add", "delete": "delete_list"}
)

PK_ENDPOINT = RoleViewSet.as_view(
    {"get": "retrieve", "put": "change", "delete": "delete"}
)

urlpatterns = [
    path("", BASE_ENDPOINT),
    path("<int:pk>/", PK_ENDPOINT),
]
