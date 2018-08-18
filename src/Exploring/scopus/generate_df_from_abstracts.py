# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import sys
import datetime
import ast
from scopus import ScopusAbstract, ScopusAuthor

from db.mongodb_connection import mongo_db
from model.abstract import Abstract


def main():
    author_search_df = pd.read_excel("scopus_author_searchs_filtered.xlsx")

    author_id_list = list(author_search_df['eid'])
    num_authors = len(author_id_list)

    total_abstract_list = []
    for ctr, author_id in enumerate(author_id_list):

        print u'({}/{}) {}'.format(ctr, num_authors, author_id)

        author = ScopusAuthor(author_id)

        abstracts = list()

        generate_row_from_documents(author, abstracts)

        total_abstract_list += abstracts

    abstracts_df = pd.DataFrame(total_abstract_list)

    abstracts_df.to_excel("scopus_abstracts.xlsx", index=False)

    authors_df = pd.read_excel("scopus_author.xlsx")
    authors_df = authors_df[['scopus_id', 'ugr_id']]

    ugr_id_lookup = dict()

    for _, row in authors_df.iterrows():

        ugr_id_lookup.update({str(row['scopus_id']): str(row['ugr_id'])})

    # to split text list .replace('[', '').replace(']', '').replace('\'', '').split(', ')

    # abstracts_df['ugr_authors'] = np.empty((len(abstracts_df), 0)).tolist()
    abstract_df_len = len(abstracts_df)
    for i, row in abstracts_df.iterrows():
        print '({}/{})'.format(i, abstract_df_len)
        # if row['ugr_authors'] is np.NaN:
        authors = row['authors']

        authors_eids = list(authors)

        for au in authors_eids:
            ugr_id = ugr_id_lookup.get(au)
            authors[au].update({'ugr_id': ugr_id})

        
        abstracts_df.at[i, 'authors'] = authors
        # abstracts_df[abstracts_df['eid'] ==
        #             row['eid']]['ugr_authors'] = ugr_authors

    abstracts_df.to_excel("scopus_abstracts_ugr_ids.xlsx", index=False)

    # TODO clean refereces to only contain iner refs
    abstracts_eid = set(abstracts_df['eid'])

    for i, row in abstracts_df.iterrows():
        references = row['references']
        print '({}/{})'.format(i, abstract_df_len)
        if references is not None:
            references = list(references)

            print 'original refs: {}'.format(len(references))

            references = [ref for ref in references if ref in abstracts_eid]

            print 'filtered refs: {}'.format(len(references))
        else:
            references = []
        abstracts_df.at[i, 'references'] = references

    # Cast all list to static hashable tuples to remove duplicates
    abstracts_df['authors'] = abstracts_df['authors'].apply(
        lambda x: str(x) if type(x) is dict else x)
    abstracts_df['keywords'] = abstracts_df['keywords'].apply(
        lambda x: tuple(x) if type(x) is list else x)
    abstracts_df['references'] = abstracts_df['references'].apply(
        lambda x: tuple(x) if type(x) is list else x)
    abstracts_df['subject_areas'] = abstracts_df['subject_areas'].apply(
        lambda x: tuple(x) if type(x) is list else x)
    # abstracts_df['ugr_authors'] = abstracts_df['ugr_authors'].apply(
    #     lambda x: tuple(x) if type(x) is list else x)

    abstracts_df = abstracts_df.drop_duplicates()

    # Re create the authors objects
    abstracts_df['authors'] = abstracts_df['authors'].apply(lambda au_str: ast.literal_eval(au_str))
    # Parse date to proper datetime
    abstracts_df['date'] = abstracts_df['date'].apply(
        lambda x:  datetime.datetime.strptime(x, '%Y-%m-%d'))

    ref_cnt = 0
    for ref in abstracts_df['references']:
        ref_cnt += len(ref)  # Total 16223

    abstracts_df.to_excel(
        "scopus_abstracts_ugr_ids_filtered.xlsx", index=False)

    abstracts = []
    for record in abstracts_df.to_dict('records'):
        a = Abstract(data=record)
        a.save()
        abstracts.append(a)


def generate_row_from_documents(author, abstracts):
    """

    """

    # New author
    total_docs_eid_list = author.get_document_eids()
    print '\tNumber of documents: {}'.format(len(total_docs_eid_list))
    num_documents = len(total_docs_eid_list)
    for doc_ctr, doc_eid in enumerate(total_docs_eid_list):
        try:
            print '\t- Doc ({}/{})'.format(doc_ctr, num_documents)
            sa = ScopusAbstract(doc_eid, view='FULL', refresh=False)

            authors = {author.scopusid: {'name': author.given_name +
                                         ' ' + author.surname} for author in sa.authors}

            abstracts.append({
                'eid': doc_eid,
                'authors': authors,
                'title': sa.title,
                'abstract': sa.abstract,
                'keywords': sa.authkeywords,
                'cites': sa.citedby_count,
                'references': sa.references,
                'scopus_url': sa.scopus_link,
                'subject_areas': sa.subjectAreas,
                'doi': sa.doi,
                'publication_name': sa.publicationName,
                'publisher': sa.publisher,
                'date': sa.coverDate
            })

        except:
            sys.stderr.write(
                '\tUnable to retrieve document {}\n'.format(doc_eid))
            return
    return
