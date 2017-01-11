from django.conf.urls import url
import show_pairs.views

urlpatterns = [
    url(r'^next-pair-page/(?P<next_page>[0-9]*)$', show_pairs.views.get_paged_pairs, name="next-pair-page" ),
]