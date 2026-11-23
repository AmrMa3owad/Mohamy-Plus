"""Generate responsive WebP variants + a manifest the page build reads.

usage:  python src/tools/optimize_images.py
Requires Pillow (pip install pillow). Re-run after adding or replacing a photo.
"""
import json, os
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(ROOT, 'images')
OUT = os.path.join(SRC, 'opt')
WIDTHS = [480, 800, 1280, 1920]
PHOTOS = ['hero2', 'about1', 'about-1', 'appointment5', 'bg_5', 'image_1', 'image_2', 'image_3',
          'case-1', 'case-2', 'case-3', 'case-4', 'case-5', 'case-6', 'case-7', 'case-8']

os.makedirs(OUT, exist_ok=True)
manifest = {}
for name in PHOTOS:
    src = os.path.join(SRC, name + '.jpg')
    im = Image.open(src).convert('RGB')
    w, h = im.size
    widths = [x for x in WIDTHS if x < w] + [min(w, 2400)]
    widths = sorted(set(widths))
    for tw in widths:
        th = round(h * tw / w)
        out = os.path.join(OUT, f'{name}-{tw}.webp')
        im.resize((tw, th), Image.LANCZOS).save(out, 'WEBP', quality=76, method=6)
    # one optimised JPEG fallback for very old browsers / social crawlers
    fw = min(w, 1600)
    im.resize((fw, round(h * fw / w)), Image.LANCZOS).save(
        os.path.join(OUT, f'{name}.jpg'), 'JPEG', quality=80, optimize=True, progressive=True)
    manifest[name] = {'w': w, 'h': h, 'widths': widths}
    print(name, w, h, widths)

with open(os.path.join(OUT, 'manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=1)
