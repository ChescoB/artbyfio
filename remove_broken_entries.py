import re

# Read the file
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and mark entries to remove
remove_ids = []
in_entry = False
current_id = None
entry_start = -1

for i, line in enumerate(lines):
    if line.strip().startswith('{'):
        in_entry = True
        entry_start = i
        current_id = None
    
    if in_entry and 'id:' in line and not current_id:
        match = re.search(r"id:\s*'([^']+)'", line)
        if match:
            current_id = match.group(1)
    
    if in_entry and 'imageUrl:' in line:
        # Check for broken image URLs
        if any(broken in line for broken in [
            'Earth from Free mind by fio.png',
            'Fire free mind series.png',
            'Untitled-Artwork.png',
            'Water Free Mind Series.png',
            'installations/fiorellapodesta.jpg'
        ]):
            remove_ids.append((entry_start, current_id))
            print(f"Marked for removal: {current_id} at line {entry_start}")
    
    if in_entry and line.strip().startswith('},'):
        in_entry = False

# Remove entries in reverse order to maintain line numbers
lines_to_remove = set()
for start_line, entry_id in remove_ids:
    # Find the end of this entry
    for i in range(start_line, len(lines)):
        lines_to_remove.add(i)
        if lines[i].strip().startswith('},'):
            break

# Filter out the lines
new_lines = [line for i, line in enumerate(lines) if i not in lines_to_remove]

# Write back
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"\nRemoved {len(remove_ids)} broken entries")
print("Fixed portfolio-data.ts!")
