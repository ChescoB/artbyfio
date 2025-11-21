import re

# Read portfolio-data.ts
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Find all entries with their category and imageUrl
pattern = r"\{\s*id:\s*'([^']+)'.*?category:\s*'([^']+)'.*?imageUrl:\s*'([^']+)'"
matches = re.findall(pattern, content, re.DOTALL)

# Check for mismatches
print("Checking for category/path mismatches:\n")

mismatches = []
for entry_id, category, image_url in matches:
    # Determine what folder the image is actually in
    if '/Murals/' in image_url:
        actual_folder = 'Murals'
    elif '/canvas-works/' in image_url:
        actual_folder = 'Canvas'
    elif '/budhaood-series/' in image_url:
        actual_folder = 'budhaood'
    elif '/free-mind-series/' in image_url:
        actual_folder = 'freemind'
    elif '/future-landscapes/' in image_url:
        actual_folder = 'landscapes'
    elif '/details/' in image_url:
        actual_folder = 'Details'
    else:
        actual_folder = 'Unknown'
    
    # Check if category matches folder
    if actual_folder == 'Murals' and category != 'Murals':
        mismatches.append((entry_id, category, actual_folder, image_url))
        print(f"❌ MISMATCH: {entry_id}")
        print(f"   Category: {category}")
        print(f"   Image in: {actual_folder}")
        print(f"   Path: {image_url}\n")
    elif actual_folder == 'Canvas' and category not in ['Canvas', 'budhaood', 'freemind', 'landscapes']:
        mismatches.append((entry_id, category, actual_folder, image_url))
        print(f"⚠️  WARNING: {entry_id}")
        print(f"   Category: {category}")
        print(f"   Image in: canvas-works folder")
        print(f"   Path: {image_url}\n")

print(f"\nTotal mismatches found: {len(mismatches)}")

if mismatches:
    print("\nSummary of needed fixes:")
    for entry_id, wrong_cat, correct_folder, path in mismatches:
        print(f"  {entry_id}: {wrong_cat} → {correct_folder}")
