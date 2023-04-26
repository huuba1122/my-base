import os
from django.urls import path

from .views.crud import PostViewSet
from .views.custom import PublicPostView

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

EXTRA_ENDPOINT = PostViewSet.as_view({
    "delete": "remove_banner",
})

PUBLIC_BASE_ENDPOINT = PublicPostView.as_view({
    "get": "list",
})


PUBLIC_PK_ENDPOINT = PublicPostView.as_view({
    "get": "retrieve",
})

PUBLIC_EXTRA_ENDPOINT = PublicPostView.as_view({
    "get": "most_views_posts",
})


urlpatterns = [
   path("", BASE_ENDPOINT),
   path("<int:pk>/", PK_ENDPOINT),
   path("<int:pk>/banner/", EXTRA_ENDPOINT),

   path("public/", PUBLIC_BASE_ENDPOINT),
   path("public/most-view/", PUBLIC_EXTRA_ENDPOINT),
   path("public/<str:slug>/", PUBLIC_PK_ENDPOINT),
]