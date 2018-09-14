from flask import Flask, Response
from flask_cors import CORS, cross_origin
from db.mongodb_connection import db_connection
import json
from bson import json_util

DEBUG = False

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo_db = db_connection('mongodb')


@app.route('/')
def hello_world():
    return 'Flask Dockerized'


@app.route('/author/<ugr_id>')
def get_author(ugr_id):
    try:
        author_doc = mongo_db.author.find_one(
            {'ugr_id': int(ugr_id)}, {'_id': 0})

        if author_doc:
            return Response(json.dumps({'success': True, 'data': author_doc, 'msg': ''}, default=json_util.default), mimetype='application/json')
        else:
            raise ValueError
    except ValueError:
        return Response(json.dumps({'success': False, 'data': {}, 'msg': 'Author not found for id "{}"'.format(ugr_id)}), mimetype='application/json')


@app.route('/abstract/<scopus_id>')
def get_abstract(scopus_id):

    abstract_doc = mongo_db.abstract.find_one(
        {'scopus_id': scopus_id}, {'_id': 0})

    if abstract_doc:
        return Response(json.dumps({'success': True, 'data': abstract_doc, 'msg': ''}, default=json_util.default), mimetype='application/json')
    else:
        return Response(json.dumps({'success': False, 'data': {}, 'msg': 'Abstract not found for id "{}"'.format(scopus_id)}), mimetype='application/json')


@app.route('/abstract-references')
def get_reference_lookup():

    abstract_lookup = {
        abstract['scopus_id']: {
            'date': abstract['date'],
            'title': abstract['title'],
            'authors': [abstract['authors'][author_id]['name'] for author_id in abstract['authors']]
        } for abstract in mongo_db.abstract.find({}, {'_id': 0, 'date': 1, 'title': 1, 'scopus_id': 1, 'authors': 1})}

    if abstract_lookup:
        return Response(json.dumps({'success': True, 'data': abstract_lookup, 'msg': ''}, default=json_util.default), mimetype='application/json')
    else:
        return Response(json.dumps({'success': False, 'data': {}, 'msg': 'Problem retrieving references'}), mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0', port=5000)
