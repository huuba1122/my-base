from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action


# from modules.account.staff.helpers.srs import AuthorSr
from ..models import Post
from ..helpers.filter import PostFilter
from ..helpers.srs import PostSrs
from ..helpers.utils import PostUtils
from ..helpers.consts import PostStatus


class PublicPostView(GenericViewSet):
    filterset_class = PostFilter
    permission_classes = (AllowAny,)
    search_fields=("title", "description", "body",)

    def list(self, request):
        queryset = Post.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = PostSrs(queryset, many=True)

        most_views = Post.objects.filter(
                status=PostStatus.ACTIVATED
            )[:1]
        
        result = {
            "items": serializer.data,
            "extra": {
                "most_views": PostSrs(most_views, many=True).data,
            },
        }

        return self.get_paginated_response(result)

    def retrieve(self, request, slug=""):
        obj = get_object_or_404(Post, slug=slug)
        result = PostSrs(obj).data
        related_posts = PostUtils.get_other_posts_by_author(obj.author, obj.id)
        result["related_posts"] = related_posts

        return Response(result)

    @action(methods=["get"], detail=False)
    def most_views_posts(self, request):
        queryset = Post.objects.filter(
                status=PostStatus.ACTIVATED
            )[:5]
        serializer = PostSrs(queryset, many=True)

        return Response(serializer.data)

