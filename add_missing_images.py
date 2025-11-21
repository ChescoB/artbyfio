import os
import re
from datetime import datetime

# Get all images from filesystem
portfolio_dir = r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\public\images\Portfolio"
all_files = []

for root, dirs, files in os.walk(portfolio_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')) and not file.startswith('.'):
            full_path = os.path.join(root, file)
            relative_path = full_path.replace(portfolio_dir, '/images/Portfolio').replace('\\', '/')
            folder = relative_path.split('/')[-2]  # Get parent folder name
            all_files.append((relative_path, folder, file))

# Read portfolio-data.ts
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all imageUrl paths
pattern = r"imageUrl:\s*'([^']+)'"
referenced_images = set(re.findall(pattern, content))

# Find missing images
missing_images = [(path, folder, file) for path, folder, file in all_files if path not in referenced_images]

print(f"Found {len(missing_images)} missing images")

# Category mapping
category_map = {
    'budhaood-series': 'budhaood',
    'canvas-works': 'Canvas',
    'details': 'Details',
    'free-mind-series': 'freemind',
    'future-landscapes': 'landscapes',
    'Murals': 'Murals'
}

# Generate new entries
new_entries = []

for path, folder, filename in sorted(missing_images):
    # Generate ID from filename
    file_id = filename.lower().replace(' ', '-').replace('.jpg', '').replace('.jpeg', '').replace('.png', '').replace('(', '').replace(')', '').replace('_', '-')
    
    # Determine category
    category = category_map.get(folder, 'Canvas')
    
    # Generate title from filename
    title = filename.replace('.jpg', '').replace('.jpeg', '').replace('.JPG', '').replace('.png', '').replace('_', ' ').replace('-', ' ')
    
    # Create entry
    entry = f"""  {{
    id: '{file_id}',
    title: '{title}',
    titleEs: '{title}',
    description: 'Contemporary artwork showcasing artistic vision and creative expression.',
    descriptionEs: 'Obra contemporánea mostrando visión artística y expresión creativa.',
    location: '',
    year: 2023,
    width: 0,
    height: 0,
    medium: 'Mixed media',
    client: '',
    category: '{category}',
    imageUrl: '{path}',
    beforeImageUrl: null,
    afterImageUrl: null,
    featured: false,
    translatedTitle: '{title}',
    translatedDescription: 'Contemporary artwork...',
    dimensions: 'Medium',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }}"""
    
    new_entries.append(entry)

# Find the last entry in the array (before the closing bracket and semicolon)
# Look for the pattern: export const portfolioArtworks = [...];
match = re.search(r'(export const portfolioArtworks[^=]*=\s*\[.*?)(\];)', content, re.DOTALL)

if match:
    before_array = match.group(1)
    # Find the last closing brace before ];
    last_brace = before_array.rfind('}')
    
    # Insert new entries
    new_content = before_array[:last_brace+1] + ',\n' + ',\n'.join(new_entries) + '\n' + match.group(2)
    
    # Replace the rest of the content after the array
    rest_of_content = content[match.end():]
    final_content = new_content + rest_of_content
    
    # Write back
    with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"Successfully added {len(new_entries)} new portfolio entries!")
    
    # Print summary by category
    from collections import Counter
    category_counts = Counter([category_map.get(folder, 'Canvas') for _, folder, _ in missing_images])
    print("\nAdded by category:")
    for cat, count in sorted(category_counts.items()):
        print(f"  {cat}: {count} images")
else:
    print("ERROR: Could not find portfolio array in file")
