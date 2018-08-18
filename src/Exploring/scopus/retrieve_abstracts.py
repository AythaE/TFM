# -*- coding: utf-8 -*-
from scopus import ScopusAuthor, ScopusAbstract
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import cPickle as pickle
from time import sleep
import sys
import traceback
from requests import HTTPError
from xml.etree.ElementTree import ParseError

import psutil

PICKLE_FILENAME = '/media/aythae/AythaE/eid_abstracts_object_list.Final.pkl'


def main():
    author_search_df = pd.read_excel("scopus_author_searchs_filtered.xlsx")

    author_id_list = list(author_search_df['eid'])
    num_authors = len(author_id_list)

    # Read pickle object where previous executions are stored
    try:
        pickleable_dictionary = load_object(PICKLE_FILENAME)
    except IOError as e:
        pickleable_dictionary = dict()
        sys.stderr.write(traceback.format_exc(1))

    num_saves = 1
    for ctr, author_id in enumerate(author_id_list):

        print u'({}/{}) Author {}: {}, {}\n\tRetrieving info...'.format(
            ctr, num_authors, author_id,
            author_search_df[author_search_df['eid']
                             == author_id]['surname'].iloc[0],
            author_search_df[author_search_df['eid'] == author_id]['givenname'].iloc[0])

        author = ScopusAuthor(author_id)

        abstracts = list()

        if author_id in pickleable_dictionary:
            if not pickleable_dictionary[author_id]['pending_abstracts']:
                # Already successfully retrieved author
                print '\tAlready retrieved, skiping...'
                continue
            else:
                # Already retrieved author with some error, keep getting it's abstracts
                total_docs_eid_list = pickleable_dictionary[author_id]['pending_abstracts']
                abstracts = pickleable_dictionary[author_id]['abstracts']
        else:
            # New author
            total_docs_eid_list = author.get_document_eids()

        print '\tNumber of documents: {}'.format(len(total_docs_eid_list))

        pending_docs_eid_list = download_abstract_list(
            total_docs_eid_list, abstracts)

        pickleable_dictionary.update(
            {author_id: {'abstracts': abstracts, 'pending_abstracts': pending_docs_eid_list}})

        if psutil.virtual_memory().percent > 85:
            # FUll memory, save part
            print 'Memory almost full, saving results to disk and cleanup'
            save_object(pickleable_dictionary,
                        PICKLE_FILENAME.format(num_saves))
            num_saves += 1
            for aid in pickleable_dictionary:
                pickleable_dictionary[aid]['abstracts'] = []

    save_object(pickleable_dictionary, PICKLE_FILENAME.format(num_saves))


def download_abstract_list(total_docs_eid_list, abstracts, num_try_per_abstract=5):
    """
        Download abstracts returning them as ScopusAbstract instances and retrying in case of HTTPErrors on the download

        :param total_docs_eid_list: List of Scopus abstracts eids
        :param abstracts: list where the ScopusAbstract instances are appended
        :param num_try_per_abstract: Numbers of download attempts per abstract before exit

        :return: list of abstracts eid pending to download (empty if all successful)
    """
    num_documents = len(total_docs_eid_list)
    for doc_ctr, doc_eid in enumerate(total_docs_eid_list):
        refresh = False
        for attempt in range(num_try_per_abstract):
            try:
                print '\t- Doc ({}/{})'.format(doc_ctr, num_documents)
                abstracts.append(ScopusAbstract(
                    doc_eid, view='FULL', refresh=refresh))

            except HTTPError as e:
                sys.stderr.write('\tHTTP ERROR. Retrying in a second...\n')
                sys.stderr.write(traceback.format_exc(1))
                sleep(1)
            except ParseError as e:
                sys.stderr.write('\tPARSE ERROR. Retrying in a second...\n')
                sys.stderr.write(traceback.format_exc(1))
                refresh = True
                sleep(1)

            else:
                break
        else:
            sys.stderr.write(
                '\tUnable to retrieve document {}\n'.format(doc_eid))
            return total_docs_eid_list[doc_ctr:]
    return []


def save_object(obj, filename):
    with open(filename, 'wb') as output:  # Overwrites any existing file.
        pickle.dump(obj, output, pickle.HIGHEST_PROTOCOL)


def load_object(filename):
    with open(filename, 'rb') as input:
        return pickle.load(input)
