import os
from django.urls import path, include

app_name = os.getcwd().split(os.sep)[-1]

urlpatterns = [
    path("", include("modules.articles.post.urls", namespace="post")),
    path("category/", include("modules.articles.category.urls", namespace="category")),
    path("attachment/", include("modules.articles.attachment.urls", namespace="article_attachment")),
]