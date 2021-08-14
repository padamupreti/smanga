import argparse
import fileinput

parser = argparse.ArgumentParser(
    description='setup configuration for manga reader'
)
parser.add_argument('location',
    help='the location where manga are stored',
)
parser.add_argument('-s', '--store',
    help='optionally store chapter data in database',
    action='store_true',
    default=False
)
args = parser.parse_args()
with fileinput.FileInput('reader/settings.py', inplace=True) as f:
    for line in f:
        if line.startswith('MEDIA_ROOT'):
            print(f"MEDIA_ROOT = Path(r'{args.location}').resolve()",)
        elif line.startswith('STORE_CH'):
            print(f"STORE_CH = {args.store}", end='')
        else:
            print(line, end='')
print('\nThe following settings were set on reader/settings.py:')
print(f"  - MEDIA_ROOT = Path(r'{args.location}').resolve()")
print(f"  - STORE_CH = {args.store}")