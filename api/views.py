from rest_framework.decorators import api_view
from rest_framework.response import Response

from .helpers import (
    get_dirnames,
    get_cbz_names,
    get_series_data,
    get_sibling_items,
    get_img_data,
    extract_cbz,
    remove_extracted
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
def item_data(request, series=None, item=None, filename=None):
    if '/api/cbz/' in request.path:
        # TODO: get the filename from url
        # extract_cbz(filename)
        info = extract_cbz(
            'Vinland Saga Omnibus v05 (2014) (Digital) (danke-Empire).cbz')
        return Response(info)
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
