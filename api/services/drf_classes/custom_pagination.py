from math import ceil

# lib
from rest_framework import pagination
from rest_framework.response import Response



class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        next_link = self.get_next_link()
        previous_link = self.get_previous_link()

        print('custom page pagination')

        count = self.page.paginator.count
        pages = ceil(count / self.page_size)

        items = data.get('items', []) if isinstance(data, dict) else data
        extra = data.get('extra', []) if isinstance(data, dict) else {}

        return Response({
            "links": {"next": next_link, "previous": previous_link},
            "count": count,
            "pages": pages,
            "page_size": self.page_size,
            "extra": extra,
            "items" : items,
        })


class NoPaginationStatic:
    @staticmethod
    def get_paginated_response(data):
        items = data.get('items', []) if isinstance(data, dict) else data
        extra = data.get('extra', []) if isinstance(data, dict) else {}

        page_size = len(items)

        return Response({
            "links" : {"next_link" : "", "previous_link" : ""},
            "count": page_size,
            "pages": 1,
            "page_size": page_size,
            "extra": extra,
            "items" : items,
        })



class NoPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return NoPaginationStatic.get_paginated_response(data)

