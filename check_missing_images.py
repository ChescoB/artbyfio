import os
import re

# Get all images from filesystem
portfolio_dir = r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\public\images\Portfolio"
all_files = []

for root, dirs, files in os.walk(portfolio_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            full_path = os.path.join(root, file)
            relative_path = full_path.replace(portfolio_dir, '/images/Portfolio').replace('\\', '/')
            all_files.append(relative_path)

print(f"Total images found in filesystem: {len(all_files)}")

# Read portfolio-data.ts
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all imageUrl paths
pattern = r"imageUrl:\s*'([^']+)'"
referenced_images = re.findall(pattern, content)

print(f"Total images referenced in portfolio-data.ts: {len(referenced_images)}")

# Find missing images
all_files_set = set(all_files)
referenced_set = set(referenced_images)

missing_in_data = all_files_set - referenced_set
broken_refs = referenced_set - all_files_set

print(f"\n=== MISSING FROM DATA FILE ({len(missing_in_data)} images) ===")
for folder in ['budhaood-series', 'canvas-works', 'details', 'free-mind-series', 'future-landscapes', 'Murals']:
    folder_missing = [img for img in sorted(missing_in_data) if f'/{folder}/' in img]
    if folder_missing:
        print(f"\n{folder} ({len(folder_missing)} missing):")
        for img in folder_missing:
            print(f"  {img}")

print(f"\n=== BROKEN REFERENCES ({len(broken_refs)} images) ===")
if broken_refs:
    for ref in sorted(broken_refs):
        print(f"  {ref}")
