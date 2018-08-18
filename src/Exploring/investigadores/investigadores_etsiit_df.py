# -*- coding: utf-8 -*-
# excel file source <http://opendata.ugr.es/dataset/rankings-de-investigadores-ugrinvestiga-segun-citacion/resource/4937db08-d757-469d-9bee-96fee9f798f8>
# import libraries
import pandas as pd
from pymongo import MongoClient

# Ipython trick to handle utf-8
# import sys
# reload(sys)
# sys.setdefaultencoding("utf-8")

# DB connection
client = MongoClient('localhost', 27017)
db = client.TFM

# Read excel
etsiit_df = pd.read_excel('./ranking7ed.2018.xlsx')
# Filter
etsiit_df = etsiit_df[etsiit_df['Disciplina'] ==
               u'Ingenierías Informática y de Telecomunicación']

# Select desired columns
etsiit_df = etsiit_df[[u'ID ugrinvestiga', u'Nombre', u'Nick', u'URL SCHOLAR',
                       u'GRUPO', u'Especialidad', u'Citas', u'Hindex', u'Citas5', u'Hindex5']]

db.etsiit_investigadores_df.insert_many(etsiit_df.to_dict('records'))
