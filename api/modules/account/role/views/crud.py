from django.db import transaction
from django.contrib.auth.models import Group as Role
from django.shortcuts import get_object_or_404
# lib
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

# app
from services.drf_classes.custom_pagination import NoPaginationStatic
from services.drf_classes.custom_permission import CustomPermission
from ..helpers.srs import RoleSr
from ..helpers.utils import RoleUtils


class RoleViewSet(GenericViewSet):
    _name = "role"
    serializer_class = RoleSr
    permission_classes = (CustomPermission,)
    pagination_classes = None
    search_fields = ("name",)

    def list(self, request):
        queryset = Role.objects.all()
        queryset = self.filter_queryset(queryset)
        serializer = RoleSr(queryset, many=True)
        result = {
            "items": serializer.data,
            "extra": {"permissions": RoleUtils.all_permissions()},
        }

        return NoPaginationStatic.get_paginated_response(result)


    def retrieve(self, request, pk=None):
        role = get_object_or_404(Role, pk=pk)
        serializer = RoleSr(role)
        return Response(serializer.data)


    @action(methods=["post"], detail=True)
    def add(self, request):
        serializer = RoleSr(data=request.data)
        serializer.is_valid(raise_exceptions=True)
        serializer.save()

        return Response(serializer.data)


    @action(methods=["put"], detail=True)
    def change(self, request, pk=None):
        role  = get_object_or_404(Role, pk=pk)
        serializer = RoleSr(role, data=request.data, partial=True)
        serializer.is_valid(raise_exceptions=True)
        serializer.save()

        return Response(serializer.data)


    @action(methods=["delete"], detail=True)
    def delete(self, request, pk=None):
        role = get_object_or_404(Role, pk=pk)
        role.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


    @transaction.atomic
    @action(methods=["delete"], detail=False)
    def delete_list(self, request):
        str_pk = request.query_param("ids", "")
        pks = [int(pk) for pk in str_pk.split(",") if pk.isdigit()]
        for pk in pks:
            item = get_object_or_404(Role, pk=pk)
            item.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
