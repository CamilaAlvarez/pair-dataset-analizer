from django.conf.urls import url
import dataset_cleanser_rest.views as views

urlpatterns = [
    url(r'^page/$', views.get_next_page, name='next_page_rest'),
    url(r'^evaluate/$', views.evaluate_pairs, name='evaluate_page_rest')
]