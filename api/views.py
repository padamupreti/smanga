from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .helpers import (
    get_dirnames,
    get_cbz_names,
    get_series_data,
    get_sibling_items,
    get_img_data,
    extract_cbz_data,
    extract_image_encoding
)

series_data = get_series_data()


@api_view(['GET'])
def series_view(request):
    data = series_data.copy()
    data['cbz_list'] = get_cbz_names()
    return Response(data)


@api_view(['GET'])
def items_list(request, series):
    item_str = '/chapters' if '/chapters' in request.path else '/volumes'
    data = {
        'name': series_data[series]['name'],
        f'{item_str[1:]}': get_dirnames(f'{series}{item_str}')
    }
    return Response(data)


@api_view(['GET'])
def item_data(request, series=None, item=None):
    item_str = '/chapters' if '/chapters' in request.path else '/volumes'
    items = get_dirnames(f'{series}{item_str}')
    siblings = get_sibling_items(item, items)
    data = {
        'name': series_data[series]['name'],
        'prev_item': siblings['prev_item'],
        'next_item': siblings['next_item'],
        'img_data': get_img_data(series, item_str[1:-1], item)
    }
    return Response(data)


@api_view(['GET'])
def cbz_metadata(request):
    name = request.GET.get('name')
    errored_response = Response(
        {'message': 'Error processing request'},
        status=status.HTTP_400_BAD_REQUEST
    )
    if name is None:
        return errored_response
    img_data = extract_cbz_data(name)
    if img_data is None:
        return errored_response
    return Response({'name': 'CBZ Viewer', 'prev_item': False, 'next_item': False, 'img_data': img_data})


@api_view(['GET'])
def cbz_image_encoding(request):
    get_qs = request.GET
    name = get_qs.get('name')
    index = get_qs.get('index')
    errored_response = Response(
        {'message': 'Error processing request'},
        status=status.HTTP_400_BAD_REQUEST
    )
    if name is None or index is None:
        return errored_response
    image_encoding = extract_image_encoding(name, index)
    if image_encoding is None:
        return errored_response
    return Response({'encoding': image_encoding})
