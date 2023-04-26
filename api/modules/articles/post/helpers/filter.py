from django_filters import rest_framework as filters

from ..models import Post

class PostFilter(filters.FilterSet):
    categories = filters.CharFilter(field_name='categories', method="filter_categories")

    def filter_categories(self, queryset, _name, value):
        category_params = value.split(',')
        category_ids = [int(x) for x in category_params if x.isnumeric()]
        queryset = queryset.filter(categories__in=category_ids)

        return queryset

    class Meta:
        model = Post
        exclude = ('banner', 'slug', 'uid',)