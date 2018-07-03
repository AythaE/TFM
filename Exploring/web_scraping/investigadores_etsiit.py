# -*- coding: utf-8 -*-
# Tutorial: <https://medium.freecodecamp.org/how-to-scrape-websites-with-python-and-beautifulsoup-5946935d93fe>
# import libraries
import urllib2
from bs4 import BeautifulSoup
import pandas as pd
from pymongo import MongoClient

# DB connection
client = MongoClient('localhost', 27017)
db = client.TFM

# specify the url
base_url = 'http://investigacion.ugr.es'
search_page = base_url + \
    '/ugrinvestiga/static/BuscadorRanking/*/buscar?tipo=&rama_c=&disciplina_c=TELE_D&especialidad_c=&indicador=&periodo=_5'

# query the website and return the html to the variable ‘page’
page = urllib2.urlopen(search_page)

# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, 'html.parser')


# find table
table = soup.find('table')

data = []
skip_first = True
table_header = [u'Rank', u'Nombre', u'Citas', u'h-index']

for tr in table.find_all('tr'):
    if skip_first:
        skip_first = False
        continue

    row_cells = [td.encode('utf-8') for td in tr.stripped_strings]
    row = {table_header[i]: row_cells[i] for i in range(0, len(table_header))}
    data.append(row)

db.etsiit_investigadores.insert_many(data)

df = pd.DataFrame(data)