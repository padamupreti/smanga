import pathlib
import zipfile
import os
from PIL import Image
import json


def extract_cbz(cbz_filepath):
    '''extract contentes of cbz to .extract hidden directory'''
    if not zipfile.is_zipfile(cbz_filepath):
        return []
    datalist = []
    try:
        with zipfile.ZipFile(cbz_filepath) as archive:
            archive.extractall(path='.extract')
            extract_path = pathlib.Path('.extract')
            for filename in archive.namelist():
                item_path = extract_path / filename
                # TODO: make sure item_path belongs to valid image
                with Image.open(item_path) as image:
                    datalist.append({
                        'name': filename,
                        'width': image.width,
                        'height': image.height
                    })
            return datalist
    except zipfile.BadZipFile:
        return []


def remove_extracted():
    '''remove everything recursively in .extract hidden directory'''
    # TODO: look up implementing removing everything recursively from directory and implement
    extract_dir = pathlib.Path('.extract')
    print(f'removing everything in {extract_dir}')


# STAGE 1 ::: user enters route (frontend sends item info request to backend)
cbz_filepath = pathlib.Path(__file__).parent / 'test.cbz'
print('extracting CBZ')
datalist = extract_cbz(cbz_filepath)
if datalist == []:
    # send failure message to frontend
    print('failure extracting CBZ')
else:
    # send data to the frontend
    with open('server_response.json', 'w') as f:
        json.dump(datalist, f, indent=4)

# STAGE 2 ::: user switches route (frontend notifies backend)
input('press enter to continue ...')
remove_extracted()
