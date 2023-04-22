from django_filters import rest_framework as filters

from ..models import Post

class PostFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    # max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    # auths = filters.
    class Meta:
        model = Post
        exclude = ('banner', 'slug', 'uid',)