from django.shortcuts import render
from .models import ImagePairs
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from . import forms


def get_paged_pairs(request, next_page=1):
    page_size = 16
    filter_form = forms.FilterForm()
    if 'filter' in request.POST:
        filter = request.POST['filter']
        filter_form.initial = {'filter':filter}
        if request.POST['filter'] != '-1':
            page_content = ImagePairs.objects.filter(img_is_pair=filter)
        else:
            page_content = ImagePairs.objects.all()
    else:
        page_content = ImagePairs.objects.all()

    paginator = Paginator(page_content, page_size)
    try:
        page = paginator.page(next_page)
    except PageNotAnInteger:
        page = paginator.page(1)
    except EmptyPage:
        page = paginator.page(paginator.num_pages)
    return render(request, 'show_pairs/index.html', {'pairs': page,
                                                     'page_range': range(1, paginator.num_pages+1),
                                                     'current_page': next_page,
                                                     'filter_form': filter_form,
                                                     'col_number':4
                                                     })

