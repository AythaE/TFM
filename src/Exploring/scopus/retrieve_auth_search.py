#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scopus import AuthorSearch
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import re
# Ipython trick to handle utf-8
# import sys
# reload(sys)
# sys.setdefaultencoding("utf-8")

# DB connection


def main():

    etsiit_df = pd.read_excel('../investigadores/ranking7ed.2018.xlsx')
    # Filter
    etsiit_df = etsiit_df[etsiit_df['Disciplina'] ==
                          u'Ingenierías Informática y de Telecomunicación']

    # Select desired columns
    etsiit_df = etsiit_df[[u'ID ugrinvestiga', u'Nombre', u'Nick']]

    etsiit_authors = etsiit_df.to_dict('records')

    #test_list = etsiit_authors

    result_df = pd.DataFrame()
    #result_df = get_author_search_results(test_list)

    source_col_options = ['Nick', 'Nombre',
                          'Nombre_sin_apellido2', 'Nombre_sin_apellido1']
    for_list = etsiit_authors[80:]
    for ctr, author in enumerate(for_list):
        source_col = 'Nick'
        first_name, last_name = get_first_name_last_name(
            author.get('Nick'))

        if last_name == "":
            # Try with full name
            first_name, last_name = get_first_name_last_name(
                author.get('Nombre'))
            source_col = 'Nombre'

        print "{}/{}".format(ctr, len(for_list))

        index_to_try = source_col_options.index(source_col)

        for i in range(index_to_try, len(source_col_options)):

            success, auth_result = make_author_query(
                first_name, last_name)

            if success:
                auth_result['ID ugrinvestiga'] = author['ID ugrinvestiga']
                result_df = result_df.append(auth_result)
            else:
                print u"no results for {} (src {})".format(
                    author['ID ugrinvestiga'], source_col_options[i])
                if i + 1 < len(source_col_options):
                    next_source_col = source_col_options[i + 1]
                    print "retrying with next source col: " + next_source_col
                    if next_source_col == 'Nombre_sin_apellido2':
                        first_name, last_name = get_first_name_last_name(
                            author.get('Nombre'), exclude_apellido2=True)
                    elif next_source_col == 'Nombre_sin_apellido1':
                        first_name, last_name = get_first_name_last_name(
                            author.get('Nombre'), exclude_apellido1=True)
                    else:
                        first_name, last_name = get_first_name_last_name(
                            author.get(next_source_col))

                else:
                    print "\nNO RESULTS FOUND AT ALL\n"

    result_df.to_excel("scopus_author_searchs.xlsx", index=False)


def explore_retrieved_data():
    total_results = pd.read_excel("scopus_author_searchs.xlsx")

    total_results = total_results.drop_duplicates()

    total_results['country'].fillna('', inplace=True)
    total_results['city'].fillna('', inplace=True)

    total_results['class'] = total_results.apply(create_label_for_pie, axis=1)

    len(total_results['ID ugrinvestiga'].unique())  # 202 / 214 = 94.39%
    total_results = total_results[total_results['country'].str.contains(
        'spain', case=False)]

    # 198 / 202 = 98.02 % de los resultados encontrados
    len(total_results['ID ugrinvestiga'].unique())

    total_results = total_results[total_results['city'].str.contains(
        'granada', case=False)]
    len(total_results['ID ugrinvestiga'].unique())  # 188/198 = 94.95 %

    total_results = total_results[total_results['areas'].str.contains(
        'comp', case=False)]
    len(total_results['ID ugrinvestiga'].unique())  # 164 / 188 = 87.23 %

    # 164 / 214 = 76.64 % del total posible de autores

    total_results.to_excel("scopus_author_searchs_filtered.xlsx", index=False)


def create_label_for_pie(r):
    city_reg = re.compile(r'granada', re.IGNORECASE)
    country_reg = re.compile(r'spain', re.IGNORECASE)
    area_reg = re.compile(r'comp', re.IGNORECASE)
    if city_reg.search(r['city']) and country_reg.search(r['country']) and area_reg.search(r['areas']):
        return 'comp_spa_gr'
    elif city_reg.search(r['city']) and country_reg.search(r['country']):
        return 'spa_gr'
    elif country_reg.search(r['country']):
        return 'spa'
    else:
        return 'other'


def get_first_name_last_name(full_name, exclude_apellido1=False, exclude_apellido2=False):
    first_name, apellido1, apellido2 = split_nombres(full_name)
    if exclude_apellido1 is False and exclude_apellido2 is False:
        last_name = apellido1 + " " + apellido2 if apellido1 or apellido2 else ""
    elif exclude_apellido2 is True:
        last_name = apellido1 if apellido1 else ""
    elif exclude_apellido1 is True:
        last_name = apellido2 if apellido2 else ""

    return first_name, last_name


def make_author_query(first_name, last_name):
    search_string = u'AUTHLAST({}) and AUTHFIRST({}) and AFFIL(Universidad de Granada)'

    s = AuthorSearch(search_string.format(
        last_name, first_name), refresh=True)
    if s.authors:
        return True, pd.DataFrame(s.authors)
    else:
        return False, pd.DataFrame()


def split_nombres(nombre):
    u"""
    Autor original en código PHP: eduardoromero.
    https://gist.github.com/eduardoromero/8495437

    Adaptacion python https://holamundopy.blogspot.com/2016/02/separar-el-nombre-de-los-apellidos-en.html

    Separa los nombres y los apellidos y retorna una tupla de tres
    elementos (string) formateados para nombres con el primer caracter
    en mayuscula. Esto es suponiendo que en la cadena los nombres y 
    apellidos esten ordenados de la forma ideal:

    1- nombre o nombres.
    2- primer apellido.
    3- segundo apellido.

    SplitNombres( '' )
    >>> ('Nombres', 'Primer Apellido', 'Segundo Apellido')
    """

    # Separar el nombre completo en espacios.
    tokens = nombre.split(" ")

    # Lista donde se guarda las palabras del nombre.
    names = []

    # Palabras de apellidos y nombres compuestos.
    especial_tokens = ['da', 'de', 'di', 'do', 'del', 'la', 'las',
                       'le', 'los', 'mac', 'mc', 'van', 'von', 'y', 'i', 'san', 'santa']

    prev = ""
    for token in tokens:
        _token = token.lower()

        if _token in especial_tokens:
            prev += token + " "

        else:
            names.append(prev + token)
            prev = ""

    num_nombres = len(names)
    nombres, apellido1, apellido2 = "", "", ""

    # Cuando no existe nombre.
    if num_nombres == 0:
        nombres = ""

    # Cuando el nombre consta de un solo elemento.
    elif num_nombres == 1:
        nombres = names[0]

    # Cuando el nombre consta de dos elementos.
    elif num_nombres == 2:
        nombres = names[0]
        apellido1 = names[1]

    # Cuando el nombre consta de tres elementos.
    elif num_nombres == 3:
        nombres = names[0]
        apellido1 = names[1]
        apellido2 = names[2]

    # Cuando el nombre consta de más de tres elementos.
    else:
        nombres = names[0] + " " + names[1]
        apellido1 = names[2]
        apellido2 = names[3]

    # Establecemos las cadenas con el primer caracter en mayúscula.
    nombres = nombres.title()
    apellido1 = apellido1.title()
    apellido2 = apellido2.title()

    return (nombres, apellido1, apellido2)
