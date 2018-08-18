from db.mongodb_connection import mongo_db
from bson import ObjectId

UGR_INVESTIGA_URL_PATTERN = 'http://investigacion.ugr.es/ugrinvestiga/static/Buscador/*/investigadores/ficha/{}'


class Author(object):
    @property
    def ugr_id(self):
        """The ugr id for the author."""
        return self._ugr_id

    @property
    def scopus_id(self):
        """The scopus id for the author."""
        return self._scopus_id

    @property
    def num_docs(self):
        """The number of scopus documents."""
        return self._num_docs

    @property
    def ugr_cites(self):
        """The ugr total number of citations."""
        return self._ugr_cites

    @property
    def ugr_hindex(self):
        """The ugr total hindex."""
        return self._ugr_hindex

    @property
    def ugr_cites5(self):
        """The ugr last 5 years number of citations."""
        return self._ugr_cites5

    @property
    def ugr_hindex5(self):
        """The ugr last 5 years hindex."""
        return self._ugr_hindex5

    @property
    def scopus_cites(self):
        """The scopus total number of citations."""
        return self._scopus_cites

    @property
    def scopus_hindex(self):
        """The scopus total hindex."""
        return self._scopus_hindex

    @property
    def scopus_url(self):
        """The scopus url for the author."""
        return self._scopus_url

    @property
    def gscholar_url(self):
        """The google scholar url for the author."""
        return self._gscholar_url

    @property
    def ugr_url(self):
        """The ugr url for the author."""
        # TODO concat ugr_id to string
        return self._ugr_url

    @property
    def full_name(self):
        """The full name of the author."""
        return self._full_name

    @property
    def nick_name(self):
        """The nick name of the author."""
        return self._nick_name

    @property
    def speciality(self):
        """The author speciality area."""
        return self._speciality

    @property
    def investigation_group(self):
        """The author investigation group."""
        return self._investigation_group

    def __init__(self, _id=None, scopus_id=None, data=None):

        if _id is not None and ObjectId.is_valid(_id):
            self._id = _id
            data = self.load()
        elif scopus_id is not None:
            data = self.load(scopus_id)
        elif data is not None:
            self._id = ObjectId()
        else:
            raise ValueError(
                "Required _id (ObjectId), scopus id or data argument for Author class")

        self._ugr_id = data.get('ugr_id')
        self._scopus_id = data.get('scopus_id')
        self._num_docs = data.get('num_docs')
        self._ugr_cites = data.get('ugr_cites')
        self._ugr_hindex = data.get('ugr_hindex')
        self._ugr_cites5 = data.get('ugr_cites5')
        self._ugr_hindex5 = data.get('ugr_hindex5')
        self._scopus_cites = data.get('scopus_cites')
        self._scopus_hindex = data.get('scopus_hindex')
        self._scopus_url = data.get('scopus_url')
        self._gscholar_url = data.get('gscholar_url')
        self._ugr_url = UGR_INVESTIGA_URL_PATTERN.format(self._ugr_id)
        self._full_name = data.get('full_name')
        self._nick_name = data.get('nick_name')
        self._speciality = data.get('speciality')
        self._investigation_group = data.get('investigation_group')


    def _data(self):
        return {
            'ugr_id':  self._ugr_id,
            'scopus_id': self._scopus_id,
            'num_docs': self._num_docs,
            'ugr_cites': self._ugr_cites,
            'ugr_hindex': self._ugr_hindex,
            'ugr_cites5': self._ugr_cites5,
            'ugr_hindex5': self._ugr_hindex5,
            'scopus_cites': self._scopus_cites,
            'scopus_hindex': self._scopus_hindex,
            'scopus_url': self._scopus_url,
            'gscholar_url': self._gscholar_url,
            'ugr_url': self._ugr_url,
            'full_name': self._full_name,
            'nick_name': self._nick_name,
            'speciality': self._speciality,
            'investigation_group': self._investigation_group,

        }

    def save(self):
        data = self._data()
        mongo_db.author.update_one({'ugr_id': self._ugr_id}, {
                             '$set': data}, upsert=True)

    def load(self, scopus_id=None):
        if scopus_id:
            return mongo_db.abstract.find_one({'scopus_id': scopus_id})
        if self._id:
            return mongo_db.abstract.find_one({'_id': self._id})
        return {}


