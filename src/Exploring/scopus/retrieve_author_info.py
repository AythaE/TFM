# -*- coding: utf-8 -*-
import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
from pymongo import MongoClient

from db.db_connection import db
from model.author import Author
from scopus import ScopusAuthor


def main():
    author_search_df = pd.read_excel("scopus_author_searchs_filtered.xlsx")

    # Clean eids
    author_search_df['eid'] = author_search_df['eid'].astype(str)
    author_search_df['eid'] = author_search_df['eid'].apply(
        lambda eid: eid[7:] if eid.startswith('9-s2.0-') else eid)

    num_authors = len(author_search_df)

    scopus_author_data_list = []
    for ctr, (_, author_row) in enumerate(author_search_df.iterrows()):
        print '({}/{})'.format(ctr, num_authors)
        author_id = author_row['eid']
        author = ScopusAuthor(author_id, refresh=False)

        scopus_author_data_list.append({
            'ugr_id': author_row['ID ugrinvestiga'],
            'scopus_id': author_id,
            'documents': author_row['documents'],
            'name': author.name,
            'scopus_hindex': author.hindex,
            'scopus_citations': author.citation_count,
            'scopus_url': author.scopus_url})

    author_df = pd.DataFrame(scopus_author_data_list)

    author_df.to_excel("scopus_author.xlsx", index=False)

    # Group authors by ugr id
    author_df['scopus_id'] = author_df['scopus_id'].apply(lambda sid: [sid])
    author_df['scopus_url'] = author_df['scopus_url'].apply(lambda surl: [
                                                            surl])

    for index, row in author_df.iterrows():
        ugr_id = row['ugr_id']
        first_row_index = author_df[author_df['ugr_id'] == ugr_id].index[0]

        if first_row_index == index:
            # This is the first row of the this author, skip
            continue
        # There's already another ugr author so combine
        first_row = author_df.loc[first_row_index]
        author_df.loc[first_row_index, 'documents'] += row['documents']
        author_df.loc[first_row_index,
                      'scopus_citations'] += row['scopus_citations']
        author_df.loc[first_row_index, 'scopus_hindex'] = row['scopus_hindex'] if first_row[
            'scopus_hindex'] < row['scopus_hindex'] else first_row['scopus_hindex']
        author_df.loc[first_row_index, 'scopus_id'].append(row['scopus_id'][0])
        author_df.loc[first_row_index, 'scopus_url'].append(
            row['scopus_url'][0])

        author_df.drop(index, inplace=True)

    author_df.to_excel("scopus_author_grouped.xlsx", index=False)


    # Retrieve data from UGR investiga dataset
    ugr_df = pd.DataFrame(
        list(db.etsiit_investigadores_df.find({}, {'_id': 0})))

    # Get the investigation groups
    grupos_df = pd.read_excel('../investigadores/grupos_investigacion_codigos.xlsx')
    grupos_df.columns = ['GRUPO', 'investigation_group']
    ugr_df = ugr_df.merge(grupos_df, how='left')
    del ugr_df['GRUPO']
    ugr_df['investigation_group'] = ugr_df['investigation_group'].fillna(
        "Unknown")

    # Merge UGR Investiga dataset with scopus dataset
    ugr_df = ugr_df.rename(columns={'ID ugrinvestiga': 'ugr_id'})
    author_df = author_df[[u'documents', u'scopus_citations', u'scopus_hindex',
                           u'scopus_id', u'scopus_url', u'ugr_id']]
    full_author_df = author_df.merge(ugr_df, how='left')

    full_author_df.columns = [u'num_docs', u'scopus_cites', u'scopus_hindex',
                              u'scopus_id', u'scopus_url', u'ugr_id',
                              u'ugr_cites', u'ugr_cites5', u'speciality',
                              u'ugr_hindex', u'ugr_hindex5', u'nick_name',
                              u'full_name', u'gscholar_url', u'investigation_group']

    full_author_df.to_excel("total_author.xlsx", index=False)

    authors = []
    for record in full_author_df.to_dict('records'):
        a = Author(data=record)
        a.save()
        authors.append(Author(data=record))
