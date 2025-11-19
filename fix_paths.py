import os

# Fix portfolio paths
file_path = r'c:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace lowercase portfolio with capital P
updated_content = content.replace('/images/portfolio/', '/images/Portfolio/')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Successfully replaced all /images/portfolio/ paths with /images/Portfolio/")
