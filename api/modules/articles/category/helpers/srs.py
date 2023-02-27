from rest_framework import serializers

from modules.articles.category.models import Category


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
            'sub_categories',
        ]

    def get_child_categories(self, obj):
        """ self referral field """
        serializer = CategorySrs(
            instance=obj.sub_categories.all(),
            many=True
        )
        return serializer.data
