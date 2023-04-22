import json
from rest_framework.serializers import ModelSerializer
from django.http import QueryDict

# app
from services.helpers.utils import Utils
from modules.articles.attachment.helpers.srs import AttachmentSrs
from modules.account.staff.helpers.srs import StaffSr
from ..models import Post

class PostAbstrSrs(ModelSerializer):
    class Meta:
        model = Post
        exclude = ()

    
    def to_representation(self, obj):
        rep = super().to_representation(obj)
        if obj.banner:
            rep["banner"] = Utils.build_full_url(obj.banner.url)
        return rep

class BriefPostSrs(PostAbstrSrs):
    class Meta:
        model = Post
        fields = (
            'id',
            "uid",
            "slug",
            'title',
            "banner",
            'description',
            'created_at',
            'updated_at'
        )

class PostSrs(PostAbstrSrs):
    
    class Meta:
        model = Post
        exclude = ()
    

    def to_representation(self, obj):
        rep = super().to_representation(obj)
        rep["attachments"] = AttachmentSrs(
            obj.attachments.filter(in_content=False), many=True
        ).data
        rep["author"] = StaffSr(obj.author).data
        return rep


    def to_internal_value(self, data):
        data = data.dict() if isinstance(data, QueryDict) else data
        title = data.get('title')
        slug = data.get('slug')
        categories = data.get('categories')
        if(categories):
            categories = json.loads(categories)
            data['categories'] = categories
        if not slug:
            slug = self.generate_slug(title)
            data['slug'] = slug
        return super().to_internal_value(data)


    def generate_slug(self, title, slug=None):
        if slug:
            new_slug = slug
        else:
            new_slug = Utils.generate_slug(title)
        is_exists = Post.objects.filter(slug=new_slug).exists()
        if is_exists:
            random_string = Utils.get_random_string(6)
            new_slug = f"{new_slug}-{random_string}"
            return self.generate_slug(title, new_slug)
        return new_slug
    
    # def pre_save(self, obj):
    #     obj.banner = self.request.FILES.get('banner')
