import os
import glob
import re
import shutil

# Target directories
PUBLIC_DIR = 'public'
CSS_DIR = os.path.join(PUBLIC_DIR, 'css')
JS_DIR = os.path.join(PUBLIC_DIR, 'js')
IMG_DIR = os.path.join(PUBLIC_DIR, 'images')

os.makedirs(CSS_DIR, exist_ok=True)
os.makedirs(JS_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

# Find files
html_files = glob.glob('*.html')
css_files = glob.glob('*.css')
js_files = glob.glob('*.js')

# Images
img_extensions = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.webp']
img_files = []
for ext in img_extensions:
    img_files.extend(glob.glob(ext))

print("Moving CSS files...")
for f in css_files:
    shutil.move(f, os.path.join(CSS_DIR, f))

print("Moving JS files...")
for f in js_files:
    shutil.move(f, os.path.join(JS_DIR, f))

print("Moving Image files...")
for f in img_files:
    shutil.move(f, os.path.join(IMG_DIR, f))

print("Moving HTML files...")
for f in html_files:
    shutil.move(f, os.path.join(PUBLIC_DIR, f))

print("All files moved successfully.")
