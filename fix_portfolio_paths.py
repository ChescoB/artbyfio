import re

# Define path corrections based on actual file locations
path_corrections = {
    "/images/Portfolio/canvas-works/Miami.jpg": "/images/Portfolio/future-landscapes/Miami.jpg",
    "/images/Portfolio/canvas-works/Orange Buddha.jpg": "/images/Portfolio/budhaood-series/Orange Buddha.jpg",
    "/images/Portfolio/canvas-works/Picture 009.jpg": "/images/Portfolio/budhaood-series/Picture 009.jpg",
    "/images/Portfolio/canvas-works/20200831_140036.jpg": "/images/Portfolio/free-mind-series/20200831_140036.jpg",
}

# Files that don't exist and should be commented out or removed
missing_files = [
    "/images/Portfolio/canvas-works/Earth from Free mind by fio.png",
    "/images/Portfolio/canvas-works/Fire free mind series.png",
    "/images/Portfolio/canvas-works/Untitled-Artwork.png",
    "/images/Portfolio/canvas-works/Water Free Mind Series.png",
    "/images/Portfolio/installations/fiorellapodesta.jpg",
]

# Read the file
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Apply corrections
for old_path, new_path in path_corrections.items():
    content = content.replace(f"imageUrl: '{old_path}'", f"imageUrl: '{new_path}'")
    print(f"Fixed: {old_path} -> {new_path}")

# Write back
with open(r"C:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts", 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nPath corrections applied!")
print(f"\nWarning: The following images don't exist and their entries should be reviewed:")
for missing in missing_files:
    print(f"  - {missing}")
