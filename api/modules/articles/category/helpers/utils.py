# app
from .srs import CategorySrs
from modules.articles.category.models import Category



class CategoryUtils:
    @staticmethod
    def get_category_options():
        categories = Category.objects.values_list("id", "title")
        return [{"value": category[0], "label": category[1]} for category in categories]
