from django.shortcuts import render
from .models import ImagePairs
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from . import forms


def get_paged_pairs(request, next_page):
    page_size = 16
    filter_form = forms.FilterForm()
    if len(next_page) == 0:
        next_page = 1
    else:
        next_page = int(next_page)
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

    start_range = range(1, min(11, paginator.num_pages+1))
    end_range = range(paginator.num_pages-10 if paginator.num_pages-10>0 else paginator.num_pages+1,
                      paginator.num_pages+1)
    middle_range = range(next_page-5 if next_page-5>0 else 1,
                         min(next_page+5, paginator.num_pages+1))

    if len(set(start_range) & set(middle_range)) != 0:
        start_range = range(min(min(start_range), min(middle_range)),
                            max(max(start_range), max(middle_range))+1)
        middle_range = range(0,0)
    elif len(set(end_range) & set(middle_range)) != 0:
        end_range = range(min(min(end_range), min(middle_range)),
                            max(max(end_range), max(middle_range))+1)
        middle_range = range(0, 0)

    return render(request, 'show_pairs/index.html', {'pairs': page,
                                                     'start_range': start_range,
                                                     'middle_range': middle_range,
                                                     'end_range': end_range,
                                                     'current_page': next_page,
                                                     'filter_form': filter_form,
                                                     'col_number':4
                                                     })

