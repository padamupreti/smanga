from django.urls import path, register_converter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    series_view,
    items_list,
    item_data
)
from .converters import ItemNum

register_converter(ItemNum, 'vorc')

urlpatterns = [
    path('series/', series_view, name='api-root'),
    path('series/<slug:series>/chapters/', items_list, name='api-chapters'),
    path('series/<slug:series>/volumes/', items_list, name='api-volumes'),
    path('series/<slug:series>/chapters/<vorc:item>/',
         item_data, name='api-chapter'),
    path('series/<slug:series>/volumes/<vorc:item>/',
         item_data, name='api-volume'),
    # TODO: create a mechanism for taking in filenames through url
    # path('cbz/<slug:filename>/', item_data, name='api-cbz'),
    path('cbz/', item_data, name='api-cbz'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
