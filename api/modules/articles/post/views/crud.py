from django.db import transaction
from django.shortcuts import get_object_or_404

# lib
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


# app
from services.drf_classes.custom_permission import CustomPermission
from modules.articles.attachment.helpers.utils import AttachmentUtils
from modules.articles.category.helpers.utils import CategoryUtils
from modules.articles.post.models import Post
from ..helpers.srs import PostSrs
from ..helpers.utils import PostUtils
class PostViewSet(GenericViewSet):
    _name="post"
    permission_classes=(CustomPermission,)
    serializer_class=PostSrs
    search_fields=("title", "description", "body",)

    def list(self, request, *args, **kwargs):
        queryset = Post.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = PostSrs(queryset, many=True)
        result = {
            "items": serializer.data,
            "extra": {
                "categories": CategoryUtils.get_category_options(),
            },
        }

        return self.get_paginated_response(result)

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Post, pk=pk)
        serializer = PostSrs(obj)

        return Response(serializer.data)
    

    @transaction.atomic
    @action(methods=['post'], detail=True)
    def add(self, request):
        obj = PostUtils.create_post(request.data, request.user)
        AttachmentUtils.update_post_uid(obj)

        serializer = PostSrs(obj)

        return Response(serializer.data)


    @transaction.atomic
    @action(methods=['put'], detail=True)
    def change(self, request, pk=None):
        obj = get_object_or_404(Post, pk=pk)
        serializer = PostSrs(obj, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
        

    def delete(self, request, pk=None):
        obj = get_object_or_404(Post, pk=pk)
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['delete'], detail=True)
    def remove_banner(self, request, pk=None):
        obj = get_object_or_404(Post, pk=pk)
        obj.banner.delete(save=True)

        return Response(status=status.HTTP_204_NO_CONTENT)