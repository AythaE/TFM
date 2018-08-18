#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scopus import AuthorSearch
import pandas as pd
s = AuthorSearch('AUTHLAST(Herrera) and AUTHFIRST(Francisco) and AFFIL(Universidad de Granada)', refresh=True)
df = pd.DataFrame(s.authors)
df = df.apply(lambda x: x.str.encode('utf-8'))

for record in df.to_dict('records'):
    print ', '.join([value.decode('utf-8') for value in record.values()])
print(df.to_string())