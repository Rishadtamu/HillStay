import os
import glob
import re
import shutil

PUBLIC_DIR = 'public'
CSS_DIR = 'public/css'
JS_DIR = 'public/js'
IMG_DIR = 'public/images'

# Get all html, css, js files
html_files = glob.glob(os.path.join(PUBLIC_DIR, '*.html'))
css_files = glob.glob(os.path.join(CSS_DIR, '*.css'))
js_files = glob.glob(os.path.join(JS_DIR, '*.js'))

# Get image file names
img_files = os.listdir(IMG_DIR)

def update_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update CSS link
    content = re.sub(r'href="([^"]+\.css)"', r'href="css/\1"', content)
    # Update JS script
    content = re.sub(r'src="([^"]+\.js)"', r'src="js/\1"', content)
    
    # Update Images
    for img in img_files:
        if img:
            content = content.replace(f'"{img}"', f'"images/{img}"')
            content = content.replace(f"'{img}'", f"'images/{img}'")
            content = content.replace(f"url('{img}')", f"url('images/{img}')")
            content = content.replace(f'url("{img}")', f'url("images/{img}")')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update Images
    for img in img_files:
        if img:
            content = content.replace(f"url('{img}')", f"url('../images/{img}')")
            content = content.replace(f'url("{img}")', f'url("../images/{img}")')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update Images
    for img in img_files:
        if img:
            content = content.replace(f'"{img}"', f'"images/{img}"')
            content = content.replace(f"'{img}'", f"'images/{img}'")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updating HTML files... {html_files}")
for file in html_files:
    update_html(file)

print(f"Updating CSS files... {css_files}")
for file in css_files:
    update_css(file)

print(f"Updating JS files... {js_files}")
for file in js_files:
    update_js(file)

print("Path updating complete.")
