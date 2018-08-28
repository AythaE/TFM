from db.mongodb_connection import mongo_db
from bson import ObjectId


class Abstract(object):

    @property
    def scopus_id(self):
        """The scopus id for the abstract."""
        return self._scopus_id

    @property
    def authors(self):
        """List of abstract's autors objects."""
        return  self._authors


    @property
    def authors_scopus_id(self):
        """List of abstract's autors scopus ids."""
        author_eids = list(self._authors)
        return author_eids

    @property
    def authors_names(self):
        """List of abstract's autors names."""
        author_names = [au['name'] for au in self._authors]
        return author_names

    @property
    def authors_ugr_id(self):
        """List of abstract's autors UGR ids."""
        author_ugr_ids = [au['ugr_id'] for au in self._authors]
        return author_ugr_ids

    @property
    def cites(self):
        """The total number of citations for this abstract."""
        return self._n_cites

    @property
    def title(self):
        """Paper title of the abstract."""
        return self._title

    @property
    def date(self):
        """
        Paper publication date, if the specific day of month is unknown 
        the date will take the first day of month.
        """
        return self._date

    @property
    def doi(self):
        """Digital Object Identifier of the paper, None if unknown."""
        return self._doi

    @property
    def keywords(self):
        """Tuple of author defined keywords as they appear in Scopus."""
        return self._keywords

    @property
    def publication_name(self):
        """Name of source the paper is published in, None if unknown."""
        return self._publication_name

    @property
    def scopus_url(self):
        """The scopus url for the abstract."""
        return self._scopus_url

    @property
    def publisher(self):
        """Publisher name of the paper, None if unknown."""
        return self._publisher

    @property
    def abstract(self):
        """Abstract of the paper."""
        return self._abstract

    @property
    def references(self):
        """Tuple of papers scopus ids cited by this one."""
        return self._references

    @property
    def subject_areas(self):
        """The subject areas of the paper."""
        return self._subject_areas

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
                "Required _id (ObjectId), scopus id or data argument for Abstract class")

        self._scopus_id = data.get('eid')
        self._authors = data.get('authors')
        self._n_cites = data.get('cites')
        self._title = data.get('title')
        self._date = data.get('date')
        self._doi = data.get('doi')
        self._keywords = data.get('keywords')
        self._publication_name = data.get('publication_name')
        self._scopus_url = data.get('scopus_url')
        self._publisher = data.get('publisher')
        self._abstract = data.get('abstract')
        self._references = data.get('references')
        self._subject_areas = data.get('subject_areas')

    def _data(self):
        return {
            'scopus_id': self._scopus_id,
            'authors': self._authors,
            'cites': self._n_cites,
            'title': self._title,
            'date': self._date,
            'doi': self._doi,
            'keywords': self._keywords,
            'publication_name': self._publication_name,
            'scopus_url': self._scopus_url,
            'publisher': self._publisher,
            'abstract': self._abstract,
            'references': self._references,
            'subject_areas': self._subject_areas,
        }

    def save(self):
        data = self._data()
        mongo_db.abstract.update_one({'scopus_id': self._scopus_id}, {
            '$set': data}, upsert=True)

    def load(self, scopus_id=None):
        if scopus_id:
            return mongo_db.abstract.find_one({'scopus_id': scopus_id})
        if self._id:
            return mongo_db.abstract.find_one({'_id': self._id})
        return {}
