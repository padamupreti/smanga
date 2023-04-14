from django.urls import path, register_converter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    series_view,
    items_list,
    item_data,
    cbz_metadata,
    cbz_image_encoding
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
    path('cbz/', cbz_metadata, name='api-cbz-meta'),
    path('cbz/data/', cbz_image_encoding, name='api-cbz-encodings'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
