import os
import re

public_dir = '/Users/rishadgurung/Desktop/HillStay/public'
for root, _, files in os.walk(public_dir):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r') as file:
                html = file.read()
            original_html = html
            
            # Use regex to clean up duplicate destination links in desktop nav
            html = re.sub(r'<a href="destination\.html" class="nav-item">Destinations</a>\s*<a href="destination\.html" class="nav-item">Destinations</a>', '<a href="destination.html" class="nav-item">Destinations</a>', html)

            if html != original_html:
                with open(path, 'w') as file:
                    file.write(html)

print("Duplicates cleaned.")
