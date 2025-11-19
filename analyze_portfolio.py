import re

# List of actual files
actual_files = [
    "01614E2A-3C31-4E0F-A8AC-B645719B91B6.jpg", "08498FFD-E1A6-4875-8D81-0DBD321BE2D0.jpg",
    "0C0B4427-5978-4039-847E-A843040883FB.jpg", "1EBBEA68-0401-457E-B95A-CB1C47E14100.jpg",
    "20170531_144059.jpg", "20190411_125340.jpg", "20190411_125843.jpg", "20190416_101247.jpg",
    "20190416_101332.jpg", "20200507_142838.jpg", "20200831_140036.jpg", "218B35BE-D416-4C0E-BCA0-AD1189C2F68F.jpg",
    "29_7A_00.JPG", "2CA35B10-C5E2-40FE-921D-6134C2385C34.jpg", "36_21A.JPG", "37_22A.JPG",
    "38_13A.JPG", "4FC64F00-103C-42F5-8CD7-2C399A58638E.jpg", "7543C5E6-0548-4570-AEA1-F273035DE3CC.jpg",
    "7DD48984-D87A-4A3F-A4F7-C7BBE185D36E.jpg", "7F0E7A55-EF86-4DFA-8787-7D51714D2DE2.jpg",
    "7F10237A-EB3E-4812-A1F0-9D1245135A6A.jpg", "804F1859-E71A-4E8C-9A79-904F2CB1CDD9.jpg",
    "8370D12E-1F3B-4889-8D75-E493F851C4D2.jpg", "93E81108-ADAF-416F-9E32-3DAD7D31AD60.jpg",
    "9AF69AED-C559-42BD-A31C-3D3019F217F4.jpg", "A6FB7B75-E7CE-4325-822B-D8BC33C43A57.jpg",
    "AD422257-A6A4-424B-8254-D2454332D32B.jpg", "ARLEQUINA .jpg", "Akasha Frog.jpg",
    "B2A89BD4-176E-4DD6-B7E3-BBCEE4B5C12A.jpg", "B533A9B6-7AD8-49C2-8A3D-5D36B54771DF.jpg",
    "B95E091D-9BDA-4D68-854A-A61759A5CD2B.jpg", "BD0F3153-E403-4FB0-BB28-FBA73198FF1E.jpg",
    "Bicicleta.jpg", "Buddha Verde.jpeg", "CACHUNA.jpg", "CC58645B-E6D9-4945-B77A-968D813B63AD.jpg",
    "D27D686A-029D-4A04-A2C4-455B0CDA6F57.jpg", "D5BAC48E-9FFA-4E01-AF52-66A639409D78.jpg",
    "Dharma Wheel.jpg", "E189B9F5-D138-4FB3-BD02-01046541C64B.jpg", "E366F15F-9261-4E89-91D4-74C89DDF98BF.jpg",
    "ELQUIAZUL.jpg", "Earth from Free mind by fio.png", "F0510EB7-2ED3-4D34-AC3F-DC1FAFDEF905.jpg",
    "FEEE5407-E922-4B84-9828-A777AEE6E4AB.jpg", "FLOWERS TALK B.jpg", "Fire free mind series.png",
    "Friends.JPG", "Green Love.jpeg", "Hermanos.jpg", "IMG-20190118-WA0006.jpg", "IMG_0315.JPG",
    "IMG_0317.JPG", "IMG_0337.JPG", "IMG_0566.JPG", "IMG_0567.JPG", "IMG_0636.JPG", "IMG_1074.JPG",
    "IMG_1079.JPG", "IMG_1081.JPG", "IMG_1086.JPG", "IMG_1088.JPG", "IMG_1089.JPG", "IMG_1091.JPG",
    "IMG_1092.JPG", "IMG_1093.JPG", "IMG_1094.JPG", "IMG_1097.JPG", "IMG_1100.JPG", "IMG_1103.JPG",
    "IMG_1105.JPG", "IMG_1106.JPG", "IMG_1112.JPG", "IMG_1113.JPG", "IMG_1127.JPG", "IMG_1129.JPG",
    "IMG_1907.JPG", "IMG_1953.JPG", "IMG_20170418_104708_296.jpg", "IMG_20170514_160914.jpg",
    "IMG_20171218_173534_015.jpg", "IMG_20190411_163610_282.jpg", "IMG_20190412_083618_316.jpg",
    "IMG_20190416_103943.jpg", "IMG_20190416_105131_049.jpg", "IMG_2831.JPG", "IMG_3204.JPG",
    "IMG_3207.JPG", "IMG_3209.JPG", "IMG_3230.JPG", "IMG_4414.JPG", "IMG_4431.JPG", "IMG_4435.JPG",
    "IMG_5352.JPG", "IMG_5353.JPG", "IMG_5355.JPG", "IMG_5358-2.JPG", "IMG_5358.JPG", "IMG_5803.JPG",
    "IMG_5807.JPG", "IMG_5808.JPG", "IMG_5814.JPG", "IMG_5822-1.JPG", "Inhale.jpg", "LOTUSY.Gfinal..jpg",
    "La Barca Olga.JPG", "MAPU .jpg", "MONEDA 2-1.jpg", "MONEDA1.jpg", "Miami.jpg", "Orange Buddha.jpg",
    "Picture 006.jpg", "Picture 009.jpg", "Picture 024.jpg", "Under the Tree .jpg", "Untitled-Artwork.png",
    "VISITA DEL PEZ MAPU .jpg", "Vientre1995 oil by fio.jpg", "Water Free Mind Series.png", "fiorellapodesta.jpg",
    "malabar.JPG", "mudra.jpg", "mundo.jpg", "portfolio_01_cdn_shop_files.jpg", "portfolio_02_cdn_shop_files.jpg",
    "portfolio_04_cdn_shop_files.jpg", "portfolio_08_cdn_shop_files.jpg", "portfolio_09_cdn_shop_files.jpg",
    "shop_01_cdn_shop_files.jpg", "shop_03_cdn_shop_files.jpg", "shop_07_cdn_shop_files.jpg",
    "shop_08_cdn_shop_files.jpg"
]

# Read portfolio data and extract all canvas imageUrls
with open(r'c:\Users\franc\Downloads\artbyfio_website_backup\artbyfio_website\nextjs_space\lib\portfolio-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all imageUrl patterns for canvas works
pattern = r"imageUrl:\s*'/images/Portfolio/canvas-works/([^']+)'"
referenced_files = re.findall(pattern, content)

print(f"Total actual files: {len(actual_files)}")
print(f"Total referenced files in portfolio: {len(referenced_files)}\n")

# Find files that exist but are NOT referenced in portfolio
actual_set = set(actual_files)
referenced_set = set(referenced_files)

missing_entries = actual_set - referenced_set
print(f"Files that EXIST but have NO portfolio entry: {len(missing_entries)}")
for f in sorted(missing_entries):
    print(f"  - {f}")

# Find entries that reference non-existent files  
phantom_entries = referenced_set - actual_set
print(f"\n\nPhantom entries (reference files that DON'T exist): {len(phantom_entries)}")
for f in sorted(phantom_entries):
    print(f"  - {f}")
