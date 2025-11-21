import re
from collections import defaultdict

# Read portfolio-data.ts
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Find all entries with their category and imageUrl
pattern = r"\{\s*id:\s*'([^']+)'.*?category:\s*'([^']+)'.*?imageUrl:\s*'([^']+)'"
matches = re.findall(pattern, content, re.DOTALL)

# Organize by category
categories = defaultdict(list)
for entry_id, category, image_url in matches:
    categories[category].append(image_url)

print("Portfolio Images by Category:\n")
print("="*70)

for category in sorted(categories.keys()):
    images = categories[category]
    print(f"\n{category}: {len(images)} images")
    print("-"*70)
    
    # Group by folder
    folders = defaultdict(int)
    for img in images:
        if '/Murals/' in img:
            folders['Murals'] += 1
        elif '/canvas-works/' in img:
            folders['canvas-works'] += 1
        elif '/budhaood-series/' in img:
            folders['budhaood-series'] += 1
        elif '/free-mind-series/' in img:
            folders['free-mind-series'] += 1
        elif '/future-landscapes/' in img:
            folders['future-landscapes'] += 1
        elif '/details/' in img:
            folders['details'] += 1
    
    for folder, count in sorted(folders.items()):
        print(f"  {folder}: {count}")

print("\n" + "="*70)
print(f"TOTAL IMAGES: {len(matches)}")
print("="*70)
