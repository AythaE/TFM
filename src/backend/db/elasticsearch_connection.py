from elasticsearch import Elasticsearch
ELASTICSEARCH_IP = 'localhost'
ELASTICSEARCH_PORT = 9200

es_conn = Elasticsearch([{'host': ELASTICSEARCH_IP, 'port': ELASTICSEARCH_PORT}])

