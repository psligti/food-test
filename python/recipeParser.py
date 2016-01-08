import requests
import re
from BeautifulSoup import BeautifulSoup
url = 'http://www.foodnetwork.com/recipes/jeff-mauro/1-smore-for-the-road-and-kiddie-smores-recipe.html'
timeEvaluation = ['timeRequired','cookTime','prepTime','totalTime']
baseURL = 'http://www.foodnetwork.com'
response = requests.get(url)
html = response.content
soup = BeautifulSoup(html)
attributes = soup.findAll(True)
for attribute in attributes:
    if attribute.has_key('itemprop'):
        # Time conversion
        if timeEvaluation.count(attribute['itemprop']):
            values = re.split('[a-zA-Z]+',attribute['content'])
            keys = re.split('[0-9]+',attribute['content'])
            print values
            print keys
        print attribute['itemprop']
        if attribute.has_key('content'):
            print attribute['content']
        else:
            try:
                print attribute.children.getText(' ')
            except AttributeError:
                print attribute.getText(' ')
                continue
