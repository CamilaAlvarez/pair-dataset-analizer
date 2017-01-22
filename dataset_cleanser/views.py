from django.shortcuts import render

#from dataset_cleanser_rest.models import Pairs


def cleanse_dataset(request):
    return render(request, 'dataset_cleanser/index.html')

def pagination_template(request):
    return render(request, 'dataset_cleanser/pagination.tpl.html')
