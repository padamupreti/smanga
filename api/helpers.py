from os.path import basename, isdir
from statistics import mode
from PIL import Image
from django.conf import settings

from .models import Collection

media_root = settings.MEDIA_ROOT
media_url = settings.MEDIA_URL

def get_dirnames(path=''):
    abs_path = media_root / path
    return [basename(d) for d in abs_path.iterdir() if isdir(d)]

def get_series_data():
    dash_removal = lambda phrase: ' '.join([part.capitalize() for part in phrase.split('-')])
    has_items = lambda key, series_dir: True if key in get_dirnames(series_dir) else False
    series_data = {} 
    for _dir in get_dirnames():
        series_data[f'{_dir}'] = {
            'name': dash_removal(_dir),
            'has_chapters': has_items('chapters', _dir),
            'has_volumes': has_items('volumes', _dir)
        }
    return series_data

def get_sibling_items(item, array):
    prev_item = False if item == array[0] else array[array.index(item) - 1]
    next_item = False if item == array[len(array) - 1] else array[array.index(item) + 1]
    return {'prev_item': prev_item, 'next_item': next_item}

def get_img_width(image_path):
    with Image.open(image_path) as image:
        image_width = image.width
    return image_width

def get_common_width(chapter_path):
    widths = [get_img_width(image_path) for image_path in chapter_path.iterdir()]
    return mode(widths)

def get_img_list(rel_ch_path):
    ch_path = media_root / rel_ch_path
    img_list = []
    for image_path in ch_path.iterdir():
        name = basename(image_path)
        data = {
            'name': name,
            'image_url': f'{rel_ch_path}/{name}',
            'width': get_img_width(image_path)
        }
        img_list.append(data)
    return img_list

def get_img_data(series, item_type, item_num):
    queryset = Collection.objects.filter(
            series=series,
            collection_type=item_type,
            item_num=item_num
        )
    if queryset:
        common_width = queryset[0].common_img_width
        img_list = queryset[0].img_list
        return {'common_width': common_width, 'media_url': media_url, 'img_list': img_list}
    elif item_type == 'chapter':
        relative_path = f'{series}/chapters/{item_num}'
        abs_path = media_root / relative_path
        common_width = get_common_width(abs_path)
        img_list = get_img_list(relative_path)
        if settings.STORE_CH:
            Collection.objects.create(
                series=series,
                collection_type=item_type,
                item_num=item_num,
                common_img_width=common_width,
                img_list=img_list
            )
        return {'common_width': common_width, 'media_url': media_url, 'img_list': img_list}
    elif item_type == 'volume':
        relative_path = f'{series}/volumes/{item_num}'
        abs_path = media_root / relative_path
        widths = []
        vol_images = []
        for chapter_path in abs_path.iterdir():
            widths.append(get_common_width(chapter_path))
            vol_images += get_img_list(f'{relative_path}/{basename(chapter_path)}')
        common_width = mode(widths)
        Collection.objects.create(
            series=series,
            collection_type=item_type,
            item_num=item_num,
            common_img_width=common_width,
            img_list=vol_images
        )
        return {'common_width': common_width, 'media_url': media_url, 'img_list': vol_images}
