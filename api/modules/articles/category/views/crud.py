# from django.db import transaction
from django.shortcuts import get_object_or_404

# lib
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


# app
from services.drf_classes.custom_permission import CustomPermission
from ..models import Category
from ..helpers.srs import CategorySrs
from ..helpers.utils import CategoryUtils


class CategoryViewSet(GenericViewSet):
    _name="category"
    permission_classes=(CustomPermission,)
    serializer_class=CategorySrs
    search_fields=("title",)

    def list(self, request, *args, **kwargs):
        queryset = Category.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = CategorySrs(queryset, many=True)
        result = {
            "items": serializer.data,
            "extra": {
                "options": CategoryUtils.get_category_options()
            }
        }

        return self.get_paginated_response(result)
    

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Category, pk=pk)
        serializer = CategorySrs(obj)

        return Response(serializer.data)
    

    @action(methods=['post'], detail=True)
    def add(self, request):
        serializer = CategorySrs(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


    @action(methods=['put'], detail=True)
    def change(self, request, pk=None):
        obj = get_object_or_404(Category, pk=pk)
        serializer = CategorySrs(obj, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
        

    def delete(self, request, pk=None):
        obj = get_object_or_404(Category, pk=pk)
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)