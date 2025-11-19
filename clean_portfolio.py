# Files that DON'T exist (need to remove these entries)
phantom_files = {
    "IMG_1996.JPG", "IMG_2006.JPG", "IMG_2170.JPG", "IMG_2333.JPG", "IMG_2334.JPG",
    "IMG_2373.JPG", "IMG_3002.JPG", "IMG_3003.JPG", "IMG_3006.JPG", "IMG_3040.JPG",
    "IMG_3041.JPG", "IMG_3042.JPG", "IMG_3044.JPG", "IMG_3045.JPG", "IMG_3046.JPG",
    "IMG_3082.JPG", "IMG_3084.JPG", "IMG_3086.JPG", "IMG_3087.JPG", "IMG_3212.JPG",
    "IMG_3214.JPG", "IMG_3219.JPG", "IMG_3223.JPG", "IMG_3224.JPG", "IMG_3225.JPG",
    "IMG_3245.JPG", "IMG_3246.JPG", "IMG_3250.JPG", "IMG_3252.JPG", "IMG_3253.JPG",
    "IMG_3254.JPG", "IMG_3264.JPG", "IMG_3280.JPG", "Picture 021.jpg", "Picture 023.jpg",
    "Picture 025.jpg", "Picture 026.jpg", "Picture 033.jpg", "Picture 036.jpg"
}

# Read the file
file_path = r'c:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Filter out lines containing phantom files
new_lines = []
removed_count = 0

for line in lines:
    # Check if this line contains any phantom file reference
    contains_phantom = any(phantom in line for phantom in phantom_files)
    
    if contains_phantom:
        removed_count += 1
        print(f"Removing line with: {[p for p in phantom_files if p in line][0]}")
    else:
        new_lines.append(line)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"\n✅ Removed {removed_count} phantom entries")
print(f"✅ Portfolio data cleaned successfully!")
