import json
import requests
from github import Github

def create_new_img_objs(response):
    full_image_array = json.loads(response.text)
    transformed_image_array = []
    # create new image json object
    for image in full_image_array:
        transformed_image_array.append({
            'url': image['urls']['raw'],
            'link': image['user']['links']['html'],
            'name': image['user']['name']
        })
    return transformed_image_array

def fetch_new_imgs(unsplash_id, orientation):
    url = 'https://api.unsplash.com/photos/random?count=30&collections=3274043'
    url += '&client_id=' + unsplash_id
    url += '&orientation=' + orientation
    return requests.get(url)

credentials = 0
with open('credentials.json') as f:
    credentials = json.load(f)

new_links = json.dumps({
    'landscape': create_new_img_objs(fetch_new_imgs(credentials['unsplash'], 'landscape')),
    'portrait': create_new_img_objs(fetch_new_imgs(credentials['unsplash'], 'portrait')),
})

g = Github(credentials['github'])
repo = g.get_repo('petetalksweb/StreetArtTab')
contents = repo.get_contents('unsplashLinks.json', ref='master')
repo.update_file(contents.path, 'new links', new_links, contents.sha, branch='gh-pages')
