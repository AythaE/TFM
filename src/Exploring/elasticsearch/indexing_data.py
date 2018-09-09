from db.elasticsearch_connection import es_conn
from db.mongodb_connection import mongo_db

AUTHOR_ES_INDEXED_COLS = ['scopus_cites',
                          'speciality',
                          'ugr_cites5',
                          'full_name',
                          'scopus_hindex',
                          'num_docs',
                          'ugr_hindex',
                          'nick_name',
                          'investigation_group',
                          'ugr_cites',
                          'ugr_hindex5']

ABSTRACT_ES_INDEXED_COLS = [u'publisher',
                            u'publication_name',
                            u'subject_areas',
                            u'title',
                            u'abstract',
                            u'keywords',
                            u'date',
                            u'cites']


def create_author_index():
    created = False
    index_name = 'author'

    # index settings
    settings = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
        "mappings": {
            "doc": {
                "dynamic": "strict",
                "properties": {
                    "full_name": {
                        "type": "text",
                        "fields": {
                            "raw": {
                                "type":  "keyword"
                            }}
                    },
                    "nick_name": {
                        "type": "text"
                    },
                    "speciality": {
                        "type": "text"
                    },
                    "investigation_group": {
                        "type": "text"
                    },

                    "scopus_cites": {
                        "type": "integer"
                    },
                    "scopus_hindex": {
                        "type": "integer"
                    },
                    "ugr_cites": {
                        "type": "integer"
                    },
                    "ugr_cites_norm": {
                        "type": "double"
                    },
                    "ugr_cites5": {
                        "type": "integer"
                    },
                    "ugr_hindex": {
                        "type": "integer"
                    },
                    "ugr_hindex_norm": {
                        "type": "double"
                    },
                    "ugr_hindex5": {
                        "type": "integer"
                    },
                    "num_docs": {
                        "type": "integer"
                    },

                }
            }
        }
    }

    try:
        if not es_conn.indices.exists(index_name):
            # Ignore 400 means to ignore "Index Already Exist" error.
            es_conn.indices.create(index=index_name, ignore=400, body=settings)
            print 'Created Index'
        created = True
    except Exception as ex:
        print(str(ex))
    finally:
        return created


def insert_author_data():

    author_data = list(mongo_db.author.find({}, {'_id': 0}))
    max_cites = float(max([author['ugr_cites']
                           for author in mongo_db.author.find({}, {'_id': 0, 'ugr_cites': 1})]))

    max_hindex = float(max([author['ugr_hindex']
                           for author in mongo_db.author.find({}, {'_id': 0, 'ugr_hindex': 1})]))
    bulk_data = []
    for auth in author_data:
        op_dict = {"index": {
            "_index": 'author',
            "_type": 'doc',
            "_id": auth['ugr_id']  # TODO maybe use mongo id instead of ugrid
        }}
        data_dict = {k: v for k, v in auth.iteritems()
                     if k in AUTHOR_ES_INDEXED_COLS}

        data_dict.update({"ugr_cites_norm": auth['ugr_cites'] / max_cites})
        data_dict.update({"ugr_hindex_norm": auth['ugr_hindex'] / max_hindex})
        
        bulk_data.append(op_dict)
        bulk_data.append(data_dict)

    res = es_conn.bulk(index='author', body=bulk_data)

    # check data is in there, and structure in there
    es_conn.search(body={"query": {"match_all": {}}}, index='author')
    es_conn.indices.get_mapping(index='author')


def create_abstract_index():
    created = False
    index_name = 'abstract'

    # index settings
    settings = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
        "mappings": {
            "doc": {
                "dynamic": "strict",
                "properties": {
                    "publisher": {
                        "type": "text"
                    },
                    "abstract": {
                        "type": "text"
                    },
                    "keywords": {
                        "type": "text"
                    },
                    "title": {
                        "type": "text",
                        "fields": {
                            "raw": {
                                "type":  "keyword"
                            }}
                    },
                    "publication_name": {
                        "type": "text"
                    },
                    "cites": {
                        "type": "integer"
                    },
                    "cites_norm": {
                        "type": "double"
                    },
                    "hindex_norm": {
                        "type": "double"
                    },
                    "date": {
                        "type": "date"
                    },
                    "subject_areas": {
                        "type": "text"
                    },
                    "authors": {
                        "type": "text"
                    }
                }
            }
        }
    }

    try:
        if not es_conn.indices.exists(index_name):
            # Ignore 400 means to ignore "Index Already Exist" error.
            es_conn.indices.create(index=index_name, ignore=400, body=settings)
            print 'Created Index'
        created = True
    except Exception as ex:
        print(str(ex))
    finally:
        return created


def insert_abstract_data():

    abstract_data = list(mongo_db.abstract.find({}, {'_id': 0}))
    max_cites = float(max([abstract['cites']
                           for abstract in mongo_db.abstract.find({}, {'_id': 0, 'cites': 1})]))
    max_hindex = float(max([abstract['hindex']
                           for abstract in mongo_db.abstract.find({}, {'_id': 0, 'hindex': 1})]))

    index_name = 'abstract'

    bulk_data = []
    for abst in abstract_data:
        op_dict = {"index": {
            "_index": index_name,
            "_type": 'doc',
            # TODO maybe use mongo id instead of ugrid
            "_id": abst['scopus_id']
        }}
        data_dict = {k: v for k, v in abst.iteritems(
        ) if k in ABSTRACT_ES_INDEXED_COLS}
        data_dict.update(
            {"authors": [abst['authors'][au_id]['name'] for au_id in abst['authors']]})
        data_dict.update({"cites_norm": abst['cites'] / max_cites})
        data_dict.update({'hindex_norm': abst['hindex']/ max_hindex})
        bulk_data.append(op_dict)
        bulk_data.append(data_dict)

    res = es_conn.bulk(index=index_name, body=bulk_data)

    # check data is in there, and structure in there
    es_conn.search(body={"query": {"match_all": {}}}, index=index_name)
    es_conn.indices.get_mapping(index=index_name)

def create_abstracts_hindex_attr ():

    abstract_data = list(mongo_db.abstract.find())

    hindex_lookup = {str(au['ugr_id']): au['ugr_hindex'] for au in mongo_db.author.find({},{'ugr_id': 1, 'ugr_hindex': 1})}

    for abst in abstract_data:

        ugr_authors = {abst['authors'][au_id]['ugr_id'] for au_id in abst['authors'] if abst['authors'][au_id]['ugr_id'] is not None}

        abst_hindex = sum([hindex_lookup[ugr_id] for ugr_id in ugr_authors])/float(len(ugr_authors))

        mongo_db.abstract.update_one({'_id': abst['_id']}, {'$set': {'hindex': abst_hindex}})