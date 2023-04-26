from rest_framework import serializers

from modules.articles.category.models import Category

class ParentSrs(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title",)


class CategorySrs(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField(
        read_only=True,
        method_name="get_child_categories",
    )

    class Meta:
        model = Category
        fields = [
            'id',
            'title',
            'is_menu',
            'is_single',
            'parent',
            'sub_categories',
        ]
        ordering = ('-id',)

    def get_child_categories(self, obj):
        """ self referral field """
        serializer = CategorySrs(
            instance=obj.sub_categories.all(),
            many=True
        )
        return serializer.data

    def to_representation(self, obj):
        rep = super().to_representation(obj)
        rep["parent"] = ParentSrs(obj.parent).data if obj.parent else None
        return rep
    
class MenuItemSrs(CategorySrs):

    def get_child_categories(self, obj):
        serializer = MenuItemSrs(
            instance=obj.sub_categories.filter(is_menu=True),
            many=True
        )

        return serializer.data
