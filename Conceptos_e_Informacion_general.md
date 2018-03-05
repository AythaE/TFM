# Conceptos
- El **Principio de Polirepresentación**, se puede describir como el incremento de la relevancia de un documento si múltiples representaciones apuntan a él.
- **Lematización**: Transformación de una palabra al "lema" al que pertenece. Usado en RI para reducir la variabilidad de terminos. Por ejemplo los verbos se pasan al lexema, los plurales a singulares y se normaliza el genero de los nombres. Esto se aplica tanto a los documentos para crear el índice como a las consultas del usuario.
- **Análisis de Co-citación**: Medida de similaridad que establece que 2 documentos serán parecidos si aparecen citados frecuentemente ambos por otros documentos. Es decir que si el documento A y B son citados por el documento C estos pueden ser similares y cuantos más documentos C los citen más lo serán.


# Bases de datos bibliográficas más importantes:
- [Web of Science (WOS)](http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&search_mode=GeneralSearch&SID=D5Dirpg96ThopOFoBlP&preferencesSaved=), probablemente requiera acceso por vpn.
- Journal Citation Reports (JCR): informe de impacto de multiples revistas cientificas incluyendo su Factor de Impacto. Parte de WOS.
- [SCOPUS](https://www.scopus.com/search/form.uri?display=basic) de elsevier
- [ScienceDirect](https://www.sciencedirect.com/): tambien de elsevier, parece tener API gratuita junto con SCOPUS.
- [PLOS](https://www.plos.org/): Editorial abierta con múltiple revistas sobre diferentes temáticas, permite la descarga de papers en formato XML. Interesante para el parseo. Contiene metadatos.
- [Digital Bibliography & Library Project (DBLP)](https://dblp.org/): Dataset libre de referencias. Interesante para analisis de co-citación


# Herramientas interesantes:
- [Part-Of-Speech Tagger (POS Tagger)](https://nlp.stanford.edu/software/tagger.shtml): Capaz de "leer" texto asignándole tipo de palabra realizando tokenización y lematización
