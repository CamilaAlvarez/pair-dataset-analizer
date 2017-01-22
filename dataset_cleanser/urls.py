from django.conf.urls import url
import dataset_cleanser.views as views

urlpatterns = [
    url(r'cleanse-page/$', views.cleanse_dataset, name='cleanse_page'),
    url(r'^pagination/$', views.pagination_template, name='pagination'),
]