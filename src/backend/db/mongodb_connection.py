from pymongo import MongoClient

# Default local mongo_db connection
client = MongoClient('localhost', 27017)
mongo_db = client.TFM


def db_connection(host='localhost', port=27017):
    '''
        Method to change the host or port of the mongo connection, if you want 
        to use the default parameters you can simply import mongo_db 
    '''
    client = MongoClient(host, port)
    mongo_db = client.TFM
    return mongo_db
