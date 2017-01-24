from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param
from rest_framework.pagination import PageNumberPagination


class CustomPaginator(PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({'count': self.page.paginator.count,
                          'pairs': data})