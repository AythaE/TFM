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
                        "type": "text"
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
                    "ugr_cites5": {
                        "type": "integer"
                    },
                    "ugr_hindex": {
                        "type": "integer"
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
  
    bulk_data = []
    for auth in author_data:
        op_dict = {"index": {
            "_index": 'author',
            "_type": 'doc',
            "_id": auth['ugr_id'] ## TODO maybe use mongo id instead of ugrid
        }}
        data_dict = {k: v for k,v in auth.iteritems() if k in AUTHOR_ES_INDEXED_COLS }
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
                        "type": "text"
                    },
                    "publication_name": {
                        "type": "text"
                    },
                    "cites": {
                        "type": "integer"
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
    index_name = 'abstract'

    bulk_data = []
    for abst in abstract_data:
        op_dict = {"index": {
            "_index": index_name,
            "_type": 'doc',
            "_id": abst['scopus_id'] ## TODO maybe use mongo id instead of ugrid
        }}
        data_dict = {k: v for k,v in abst.iteritems() if k in ABSTRACT_ES_INDEXED_COLS }
        data_dict.update({"authors": [abst['authors'][au_id]['name'] for au_id in abst['authors']]})
        bulk_data.append(op_dict)
        bulk_data.append(data_dict)

    res = es_conn.bulk(index=index_name, body=bulk_data)

    # check data is in there, and structure in there
    es_conn.search(body={"query": {"match_all": {}}}, index=index_name)
    es_conn.indices.get_mapping(index=index_name)

