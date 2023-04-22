from django.http import QueryDict

from rest_framework.serializers import ModelSerializer

from modules.articles.attachment.models import Attachment
from services.helpers.utils import Utils



class AttachmentSrs(ModelSerializer):
    class Meta:
        model = Attachment
        exclude = ()
    
    def to_representation(self, obj):
        rep = super().to_representation(obj)
        rep["url"] = Utils.build_full_url(obj.file.url)
        return rep

    def to_internal_value(self, data):
        data = data.dict() if isinstance(data, QueryDict) else data
        file = data.get('file')
        file_name = file.name if file else ""
        
        title = data.get('title')
        if not title:
            data['title'] = file.name
        
        data['mine_type'] = Utils.get_filetype_from_filename(file_name)

        return super().to_internal_value(data)