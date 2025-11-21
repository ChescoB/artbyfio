import re

# Read portfolio-data.ts
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Find entries that need category corrections
fixes = []

# Pattern to find entries
entry_pattern = r"(\{\s*id:\s*'[^']+',.*?category:\s*')([^']+)('.*?imageUrl:\s*'([^']+)'[^}]*\})"

def should_fix_category(current_category, image_url):
    """Determine if category needs to be fixed based on image path"""
    if '/budhaood-series/' in image_url and current_category != 'budhaood':
        return 'budhaood'
    elif '/free-mind-series/' in image_url and current_category != 'freemind':
        return 'freemind'
    elif '/future-landscapes/' in image_url and current_category != 'landscapes':
        return 'landscapes'
    elif '/details/' in image_url and current_category != 'Details':
        return 'Details'
    elif '/Murals/' in image_url and current_category != 'Murals':
        return 'Murals'
    return None

matches = list(re.finditer(entry_pattern, content, re.DOTALL))
print(f"Found {len(matches)} entries to check")

# Apply fixes
new_content = content
for match in reversed(matches):  # Reverse to maintain positions
    before = match.group(1)
    current_category = match.group(2)
    after = match.group(3)
    image_url = match.group(4)
    
    correct_category = should_fix_category(current_category, image_url)
    
    if correct_category:
        old_text = match.group(0)
        new_text = before + correct_category + after
        new_content = new_content[:match.start()] + new_text + new_content[match.end():]
        fixes.append((image_url.split('/')[-1], current_category, correct_category))
        print(f"Fixed: {image_url.split('/')[-1]}: {current_category} → {correct_category}")

# Write back
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\n✅ Applied {len(fixes)} category corrections!")
