from rest_framework.decorators import api_view
from dataset_cleanser_rest.serializers import PairsSerializers, EvaluationSerializer
from dataset_cleanser_rest.models import Pairs
from dataset_cleanser_rest.paginator import CustomPaginator
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
import rest_framework.status as status
import time


@api_view(['GET', 'POST'])
def get_next_page(request):
    pairs = Pairs.objects.filter(par_negative_pair=False)
    paginator = CustomPaginator()
    page = paginator.paginate_queryset(pairs, request)
    serialized_page = PairsSerializers(page, many=True)
    return paginator.get_paginated_response(serialized_page.data)


@api_view(['POST'])
def evaluate_pairs(request):
    json_data = JSONParser().parse(request)
    deserialized_data = EvaluationSerializer(data=json_data, many=True)
    if deserialized_data.is_valid():
        try:
            deserialized_data.save()
        except Exception,e:
            print e
            return Response({'error': 'Invalid request', 'status':1}, status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response({'error':"", 'status':0},status.HTTP_200_OK)
    errors = deserialized_data.errors
    errors[0]['status'] = 1
    return Response(errors[0], status.HTTP_400_BAD_REQUEST)
