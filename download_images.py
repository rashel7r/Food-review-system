import requests
import os

# Create the directory if it doesn't exist
os.makedirs('public/foodimages', exist_ok=True)

# Sample food images (using placeholder.com for demonstration)
images = {
    'asian-food.jpg': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=500&fit=crop',
    'italian-food.jpg': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=500&fit=crop',
    'mexican-food.jpg': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop',
    'indian-food.jpg': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop',
    'american-food.jpg': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    'spicy-food.jpg': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=500&fit=crop',
    'sweet-food.jpg': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=500&fit=crop',
    'savory-food.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop',
    'healthy-food.jpg': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop',
    'main-course.jpg': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop',
    'dessert.jpg': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=500&fit=crop',
    'appetizer.jpg': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=500&fit=crop',
    'beverage.jpg': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=500&fit=crop'
}

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(f'public/foodimages/{filename}', 'wb') as f:
                f.write(response.content)
            print(f'Successfully downloaded {filename}')
        else:
            print(f'Failed to download {filename}')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

# Download all images
for filename, url in images.items():
    download_image(url, filename) 