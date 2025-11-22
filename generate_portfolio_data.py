import os
import re
import json
from pathlib import Path
from datetime import datetime

# Base path to portfolio images
PORTFOLIO_BASE = r"public\IMAGES\PORTAFOLIO"

def clean_title(filename):
    """Extract clean title from filename"""
    # Remove extension
    title = re.sub(r'\.(jpg|JPG|jpeg|png|PNG)$', '', filename)
    # Remove medium info
    title = re.sub(r'\s*(oil|Oil|OIL)\s*on\s*canvas.*$', '', title, flags=re.IGNORECASE)
    title = re.sub(r'\s*(acrylic|Acrylic|ACRYLIC)\s*on\s*canvas.*$', '', title, flags=re.IGNORECASE)
    # Remove year at end
    title = re.sub(r'\s*\d{4}\s*$', '', title)
    # Remove "by fio" and similar
    title = re.sub(r'\s*by\s+fio\s*$', '', title, flags=re.IGNORECASE)
    # Clean up series numbers
    title = re.sub(r'\s+#(\d+)', r' #\1', title)
    # Clean multiple spaces
    title = re.sub(r'\s+', ' ', title).strip()
    return title

def extract_year(filename, folder_path):
    """Extract year from filename or folder"""
    # Try to find year in filename
    year_match = re.search(r'\b(19\d{2}|20\d{2})\b', filename)
    if year_match:
        return int(year_match.group(0))
    
    # Check folder path for year indicators
    if '2025' in folder_path:
        return 2025
    if '2024' in folder_path:
        return 2024
    if '2023' in folder_path:
        return 2023
    if '2022' in folder_path:
        return 2022
    if 'OIL ON CANVAS (Early Work from 1986 to 2005)' in folder_path:
        return 1998  # Default for early oil works
    
    return 2020  # Default for recent acrylic

def extract_medium(filename):
    """Extract medium from filename"""
    filename_lower = filename.lower()
    if 'oil on canvas' in filename_lower:
        return 'Oil on canvas'
    if 'acrylic on canvas' in filename_lower:
        return 'Acrylic on canvas'
    if 'pigments on clay' in filename_lower:
        return 'Pigments on clay wall'
    if 'spray paint' in filename_lower:
        return 'Acrylic and spray paint on wall'
    return 'Mixed media'

def determine_category(folder_path, filename):
    """Determine artwork category based on folder structure"""
    if 'BUDDHA SERIES' in folder_path or 'buddha' in filename.lower():
        return 'buddha'
    if 'FREE MIND SERIES' in folder_path:
        return 'freemind'
    if 'FUTURE LANDSCAPE' in folder_path:
        return 'landscapes'
    if 'DETAILS' in folder_path or folder_path.endswith('DETAILS'):
        return 'details'
    if 'MURALS' in folder_path or folder_path.endswith('MURALS'):
        return 'murals'
    if 'COMMISSIONED' in folder_path:
        return 'commissioned'
    if 'OIL ON CANVAS' in folder_path:
        return 'oil'
    if 'ACRYLIC ON CANVAS' in folder_path:
        return 'acrylic'
    if 'CANVAS' in folder_path:
        return 'canvas'
    return 'canvas'

def generate_spanish_title(english_title):
    """Generate Spanish title with common translations"""
    translations = {
        'Buddha': 'Buda',
        'Green': 'Verde',
        'Orange': 'Naranja',
        'Golden': 'Dorado',
        'Free Mind': 'Mente Libre',
        'Future Landscape': 'Paisaje Futuro',
        'Detail': 'Detalle',
        'Series': 'Serie',
        'Abstract': 'Abstracto',
        'Feeling': 'Sintiendo',
        'Under the Tree': 'Bajo el Árbol',
        'Woman': 'Mujer',
        'Womb': 'Vientre',
        'Friends': 'Amigos',
        'Travels': 'Viajes',
        'Sunset': 'Atardecer',
        'School': 'Escuela',
        'Gym': 'Gimnasio',
    }
    
    spanish_title = english_title
    for en, es in translations.items():
        spanish_title = re.sub(en, es, spanish_title, flags=re.IGNORECASE)
    
    return spanish_title

def generate_description(title, category, medium):
    """Generate basic description based on title and category"""
    if category == 'buddha':
        return f"A spiritual artwork exploring themes of enlightenment and consciousness through {medium.lower()}."
    elif category == 'freemind':
        return f"Part of the Free Mind series, celebrating creative freedom and artistic liberation through {medium.lower()}."
    elif category == 'landscapes':
        return f"Visionary landscape imagining future worlds through vibrant colors and abstract forms in {medium.lower()}."
    elif category == 'details':
        return f"An intimate detail view revealing intricate brushwork and masterful technique in {medium.lower()}."
    elif category == 'murals':
        return f"A large-scale mural transforming public spaces through vibrant artistic expression."
    else:
        return f"Contemporary artwork showcasing artistic vision through {medium.lower()}."

def generate_id(filename):
    """Generate unique ID from filename"""
    # Remove extension and convert to lowercase
    id_str = re.sub(r'\.(jpg|JPG|jpeg|png|PNG)$', '', filename)
    # Replace spaces and special characters with hyphens
    id_str = re.sub(r'[^\w\s-]', '', id_str)
    id_str = re.sub(r'[-\s]+', '-', id_str).lower().strip('-')
    return id_str

def scan_portfolio_images():
    """Scan all portfolio images and generate artwork data"""
    artworks = []
    
    for root, dirs, files in os.walk(PORTFOLIO_BASE):
        # Skip PRESS AND SHOWS folder
        if 'PRESS AND SHOWS' in root:
            continue
            
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                # Get relative path from PORTAFOLIO folder
                rel_path = os.path.relpath(os.path.join(root, file), PORTFOLIO_BASE)
                # Convert to web path (keep IMAGES uppercase to match actual folder)
                image_url = f"/IMAGES/PORTAFOLIO/{rel_path.replace(os.sep, '/')}"
                
                # Extract information
                title = clean_title(file)
                title_es = generate_spanish_title(title)
                year = extract_year(file, root)
                medium = extract_medium(file)
                category = determine_category(root, file)
                artwork_id = generate_id(file)
                description = generate_description(title, category, medium)
                description_es = description  # Would need translation service for full Spanish
                
                artwork = {
                    'id': artwork_id,
                    'title': title,
                    'titleEs': title_es,
                    'description': description,
                    'descriptionEs': description_es,
                    'location': '',
                    'year': year,
                    'width': 0,
                    'height': 0,
                    'medium': medium,
                    'client': '',
                    'category': category,
                    'imageUrl': image_url,
                    'beforeImageUrl': None,
                    'afterImageUrl': None,
                    'featured': False,
                    'translatedTitle': title,
                    'translatedDescription': description,
                    'dimensions': 'Canvas' if 'canvas' in medium.lower() else 'Mural',
                }
                
                artworks.append(artwork)
    
    return artworks

def generate_typescript_file(artworks):
    """Generate TypeScript portfolio data file"""
    
    # Sort artworks by category then by title
    artworks_sorted = sorted(artworks, key=lambda x: (x['category'], x['title']))
    
    ts_content = """import { MuralProjectWithTranslation } from './types';

// Portfolio category labels
export const categoryLabels: Record<'all' | 'canvas' | 'murals' | 'buddha' | 'freemind' | 'landscapes' | 'details' | 'oil' | 'acrylic' | 'commissioned', { en: string; es: string }> = {
  all: { en: 'All Works', es: 'Todas las Obras' },
  canvas: { en: 'Canvas Works', es: 'Obras en Lienzo' },
  murals: { en: 'Murals', es: 'Murales' },
  buddha: { en: 'Buddha Series', es: 'Serie Buda' },
  freemind: { en: 'Free Mind Series', es: 'Serie Mente Libre' },
  landscapes: { en: 'Future Landscapes', es: 'Paisajes Futuros' },
  details: { en: 'Detail Views', es: 'Vistas Detalladas' },
  oil: { en: 'Oil on Canvas', es: 'Óleo sobre Lienzo' },
  acrylic: { en: 'Acrylic on Canvas', es: 'Acrílico sobre Lienzo' },
  commissioned: { en: 'Commissioned Work', es: 'Obras Comisionadas' },
};

export const portfolioArtworks: MuralProjectWithTranslation[] = [
"""
    
    for artwork in artworks_sorted:
        ts_content += f"""  {{
    id: '{artwork['id']}',
    title: '{artwork['title'].replace("'", "\\'")}',
    titleEs: '{artwork['titleEs'].replace("'", "\\'")}',
    description: '{artwork['description'].replace("'", "\\'")}',
    descriptionEs: '{artwork['descriptionEs'].replace("'", "\\'")}',
    location: '',
    year: {artwork['year']},
    width: 0,
    height: 0,
    medium: '{artwork['medium']}',
    client: '',
    category: '{artwork['category']}',
    imageUrl: '{artwork['imageUrl']}',
    beforeImageUrl: null,
    afterImageUrl: null,
    featured: {str(artwork['featured']).lower()},
    translatedTitle: '{artwork['translatedTitle'].replace("'", "\\'")}',
    translatedDescription: '{artwork['translatedDescription'].replace("'", "\\'")}',
    dimensions: '{artwork['dimensions']}',
    createdAt: new Date('{artwork['year']}-01-01'),
    updatedAt: new Date('{artwork['year']}-01-01')
  }},
"""
    
    ts_content += "];\n"
    
    return ts_content

if __name__ == '__main__':
    print("Scanning portfolio images...")
    artworks = scan_portfolio_images()
    print(f"Found {len(artworks)} artworks")
    
    print("Generating TypeScript file...")
    ts_content = generate_typescript_file(artworks)
    
    output_file = 'lib/portfolio-data.ts'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Generated {output_file} successfully!")
    print(f"Total artworks: {len(artworks)}")
    
    # Print category breakdown
    categories = {}
    for artwork in artworks:
        cat = artwork['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\nCategory breakdown:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")
