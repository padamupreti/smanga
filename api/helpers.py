from os.path import basename, isdir
import base64
import zipfile
from statistics import mode
from PIL import Image
from django.conf import settings

from .models import Collection

media_root = settings.MEDIA_ROOT
media_url = settings.MEDIA_URL


def get_dirnames(path=''):
    abs_path = media_root / path
    items = [basename(d) for d in abs_path.iterdir() if isdir(d)]
    items.sort()
    return items


def get_series_data():
    def dash_removal(phrase): return ' '.join(
        [part.capitalize() for part in phrase.split('-')])
    def has_items(key, series_dir): return True if key in get_dirnames(
        series_dir) else False
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
    next_item = False if item == array[len(
        array) - 1] else array[array.index(item) + 1]
    return {'prev_item': prev_item, 'next_item': next_item}


def get_img_width(image_path):
    with Image.open(image_path) as image:
        image_width = image.width
    return image_width


def get_common_width(images_path):
    widths = [get_img_width(image_path)
              for image_path in images_path.iterdir()]
    return mode(widths)


def get_img_list(rel_ch_path):
    ch_path = media_root / rel_ch_path
    img_list = []
    for image_path in ch_path.iterdir():
        data = {
            'image_url': f'{rel_ch_path}/{basename(image_path)}',
            'image_alt': basename(image_path),
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
    relative_path = f'{series}/{item_type}s/{item_num}'
    abs_path = media_root / relative_path
    common_width = get_common_width(abs_path)
    img_list = get_img_list(relative_path)
    if item_type == 'volume' or (item_type == 'chapter' and settings.STORE_CH):
        Collection.objects.create(
            series=series,
            collection_type=item_type,
            item_num=item_num,
            common_img_width=common_width,
            img_list=img_list
        )
    return {'common_width': common_width, 'media_url': media_url, 'img_list': img_list}


def get_cbz_names():
    names = [basename(f) for f in media_root.iterdir()
             if f.is_file and f.suffix == '.cbz']
    names.sort()
    return names


def extract_cbz_data(name):
    widths_list = []
    images = []

    path = media_root / name
    if not zipfile.is_zipfile(path):
        return None
    with zipfile.ZipFile(path) as archive:
        namelist = archive.namelist()
        if len(namelist) == 0:
            return None
        namelist.sort()
        for i, item in enumerate(namelist):
            if item.endswith('.jpg') or item.endswith('.png'):
                with archive.open(item) as f:
                    with Image.open(f) as image:
                        width = image.width
                        widths_list.append(width)
                        images.append(
                            {'image_alt': basename(item), 'width': width})

    images_data = {
        'common_width': mode(widths_list),
        'img_list': images
    }

    return images_data


def extract_image_encoding(cbz_name, image_name):
    path = media_root / cbz_name
    if not zipfile.is_zipfile(path):
        return None
    encoded_image = None
    with zipfile.ZipFile(path) as archive:
        for item in archive.namelist():
            if basename(item) == image_name:
                encoded_image = base64.b64encode(archive.read(item))
    return encoded_image
