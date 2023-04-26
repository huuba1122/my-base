from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from services.models.repo import Repo
from modules.articles.category.helpers.srs import MenuItemSrs



class ConfigView(APIView):
    permission_classes =(AllowAny,)

    def __init__(self, **kwargs):
        super().__init__()
        self.category_model = Repo.load(Repo.CATEGORY)

    def get(self, request, *args, **kwargs):
        menu_src = MenuItemSrs(
            instance=self.category_model.objects.filter(parent=None),
            many=True,
        )

        result = {
            "menu_items": menu_src.data
        }

        return Response(result)

