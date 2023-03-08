from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response


from services.drf_classes.custom_permission import CustomPermission
from modules.account.role.helpers.utils import RoleUtils

from ..models import Staff
from ..helpers.utils import StaffUtils
from ..helpers.srs import StaffSr

class StaffViewSet(GenericViewSet):

    _name = "staff"
    permission_classes = (CustomPermission,)
    serializer_class = StaffSr
    search_fields = ["email", "phone_number", "first_name", "last_name"]

    def list(self, request):
        queryset = Staff.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = StaffSr(queryset, many=True)

        result = {
            "items": serializer.data,
            "extra": {
                "groups": RoleUtils.get_list_group(),
            },
        }

        return self.get_paginated_response(result)

    def retrieve(self, request, pk=None):
        print('get staff', pk)
        obj = get_object_or_404(Staff, pk=pk)
        serializer = StaffSr(obj)
        return Response(serializer.data)

    @transaction.atomic
    @action(methods=["post"], detail=True)
    def add(self, request):
        obj = StaffUtils.create_staff(request.data)
        sr = StaffSr(obj)
        return Response(sr.data)

    @transaction.atomic
    @action(methods=["put"], detail=True)
    def change(self, request, pk=None):
        obj = get_object_or_404(Staff, pk=pk)
        obj = StaffUtils.update_staff(obj, request.data)
        sr = StaffSr(obj)
        return Response(sr.data)

    @transaction.atomic
    @action(methods=["delete"], detail=True)
    def delete(self, request, pk=None):
        item = get_object_or_404(Staff, pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @transaction.atomic
    @action(methods=["delete"], detail=False)
    def delete_list(self, request):
        pk = self.request.query_params.get("ids", "")
        pks = [int(pk)] if pk.isdigit() else [int(i) for i in pk.split(",")]
        for pk in pks:
            item = get_object_or_404(Staff, pk=pk)
            item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
