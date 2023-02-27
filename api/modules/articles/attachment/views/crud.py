from django.shortcuts import get_object_or_404

# lib
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

# app
from services.drf_classes.custom_permission import CustomPermission
from ..helpers.srs import AttachmentSrs
from ..models import Attachment
from ..helpers.utils import AttachmentUtils

class AttachmentViewSet(GenericViewSet):
    _name = "attachment"
    serializer = AttachmentSrs
    permission_classes = (CustomPermission,)
    search_fields = ('title',)


    def list(self, request, *args, **kwargs):
        queryset = Attachment.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = AttachmentSrs(queryset, many=True)

        return self.get_paginated_response(serializer.data)


    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Attachment, pk=pk)
        serializer = AttachmentSrs(obj)

        return Response(serializer.data)


    @action(methods=['post'], detail=True)
    def add(self, request):
        file = request.FILES['file']
        title = file.name
        print('file upload', file)
        print('file upload type', file.content_type)

        serializer = AttachmentSrs(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        result = AttachmentUtils.update_title(obj, title)
        
        return Response(AttachmentSrs(result).data)


    @action(methods=['put'], detail=True)
    def change(self, request, pk=None):
        obj = get_object_or_404(Attachment, pk=pk)
        file = request.FILES['file']
        title = file.name
        print('file upload', file.content_type)
        serializer = AttachmentSrs(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        result = AttachmentUtils.update_title(obj, title)
        
        return Response(AttachmentSrs(result).data)


    @action(methods=['delete'], detail=True)
    def delete(self, request, pk=None):
        obj = get_object_or_404(Attachment, pk=pk)
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
