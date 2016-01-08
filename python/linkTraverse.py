import requests
from BeautifulSoup import BeautifulSoup
url = 'http://www.foodnetwork.com/recipes/a-z.123.1.html'
baseURL = 'http://www.foodnetwork.com'
response = requests.get(url)
html = response.content
soup = BeautifulSoup(html)
letters = soup.find('section',{'class':'a-to-z-btns'}).findAll('a')
for letter in letters:
    next_letter = letter
    next_letter_url = baseURL+next_letter['href']
    response = requests.get(next_letter_url)
    html = response.content
    soup = BeautifulSoup(html)
    while True:
        links = soup.find('div',{'class':'row atoz'}).findAll('a')
        for recipe in links:
            href = recipe['href']
            name = recipe.string
            # fullRecipe = requests.get(baseURL+href)
            print name
            # recipeResponse = fullRecipe.content
            # recipeSoup = BeautifulSoup(recipeResponse)
        try:
            next_page = soup.find('div',{'class':'pagination'}).find('a',{'class':'btn fig right'})
            next_page_url = baseURL+next_page['href']
            response = requests.get(next_page_url)
            html = response.content
            soup = BeautifulSoup(html)
        except IndexError:
            break
        except TypeError:
            break
        except AttributeError:
            break
