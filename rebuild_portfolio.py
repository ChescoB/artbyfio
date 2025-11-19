import os
import json

# Get actual files
canvas_dir = r'c:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\public\images\Portfolio\canvas-works'
actual_files = set()
for file in os.listdir(canvas_dir):
    if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        actual_files.add(file)

print(f"Found {len(actual_files)} actual image files")
print("\nActual files:")
for f in sorted(actual_files):
    print(f"  {f}")
