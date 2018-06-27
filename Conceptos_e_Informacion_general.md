# Conceptos
- El **Principio de Polirepresentación**, se puede describir como el incremento de la relevancia de un documento si múltiples representaciones apuntan a él. Estas representaciones pueden venir de diferentes actores del sistema de IR o del mismo actor pero con distinto proposito y funcionalidad.
- **Lematización**: Transformación de una palabra al "lema" al que pertenece. Usado en RI para reducir la variabilidad de terminos. Por ejemplo los verbos se pasan al lexema, los plurales a singulares y se normaliza el genero de los nombres. Esto se aplica tanto a los documentos para crear el índice como a las consultas del usuario.
- **Análisis de Co-citación**: Medida de similaridad que establece que 2 documentos serán parecidos si aparecen citados frecuentemente ambos por otros documentos. Es decir que si el documento A y B son citados por el documento C estos pueden ser similares y cuantos más documentos C los citen más lo serán.
- **Language Model Document Priors**: Wessel Kraaij, Thijs Westerveld, and Djoerd Hiemstra. The importance of prior probabilities for entry page search. In Proceedings of the 25th Annual International ACM SIGIR Conference on Research and Development in Information Retrieval, SIGIR ’02, pages 27–34, New York, NY, USA, 2002. ACM.
- **Binned stimation**: estimación de valores mediante cross validation y media de los resultados
- **Smoothing for Language models**: Jelinek–Mercer (JM), Dirichlet, two-stage smoothing http://mlwiki.org/index.php/Smoothing_for_Language_Models
- **Evaluation measures for IR systems**: Mean Average Precision (MAP), Precision at 10 (P@10), nDCG and BPREF https://en.wikipedia.org/wiki/Evaluation_measures_%28information_retrieval%29#Precision

# Medidas bibliométricas
- **Numero de citas**: Es la más básica, se puede encontrar en GS,Scopues o WoS
- **Co-citación**: explicado arriba en análisis de cocitación
- **Índice-h**: Diseñado para medir la productividad y el impacto de un _autor_. Número de sus publicaciones h que tienen h o más citas.
- **Índice-g**:
- **Factor de impacto de la revista**: media de citas recibidas por paper de una revista en los previos 2 años
- **Impacto de citas¡ ponderado por el campo**: ratio de citas relativo a la media mundial de la materia, tipo de publicación y año
- **Bibliographic coupling**: medida de similaridad entre documentos basada en que 2 documentos serán más parecidos cuantas más referencias compartan.
- **Bradfordizing**
- **Altmetrics**: Metrícas relativas al mundo online, veces que un articulo es descargado, compartido o mencionado en redes sociales, blogs o periodicos.
    - Altmetric donut: una medida creada como conglomerado de diversas altmetric

## Limitaciones bibliometría:
- No indican directamente calidad, solo de lo que se "habla" mucho
- Dependientes de disciplina, no se cita igual en medicina que en otros campos
- Las medidas a nivel de autor dependen de la experiencia de este.
- Datos incompletos.

## Fuentes interesantes:
- White Paper Measuring Research Output through Bibliometrics
https://uwspace.uwaterloo.ca/bitstream/handle/10012/10323/Bibliometrics%20White%20Paper%202016%20Final_March2016.pdf
- https://library.leeds.ac.uk/info/1406/research_support/17/measuring_research_impact
- http://www.metrics-toolkit.org


# Bases de datos bibliográficas más importantes:
- [Web of Science (WOS)](http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&search_mode=GeneralSearch&SID=D5Dirpg96ThopOFoBlP&preferencesSaved=), probablemente requiera acceso por vpn.
- Journal Citation Reports (JCR): informe de impacto de multiples revistas cientificas incluyendo su Factor de Impacto. Parte de WOS.
- [SCOPUS](https://www.scopus.com/search/form.uri?display=basic) de elsevier
- [ScienceDirect](https://www.sciencedirect.com/): tambien de elsevier, parece tener API gratuita junto con SCOPUS.
- [PLOS](https://www.plos.org/): Editorial abierta con múltiple revistas sobre diferentes temáticas, permite la descarga de papers en formato XML. Interesante para el parseo. Contiene metadatos.
- [Digital Bibliography & Library Project (DBLP)](https://dblp.org/): Dataset libre de referencias. Interesante para analisis de co-citación
- [MR.Dlib](http://mr-dlib.org/): Machine-readable Digital Library, Opensource recommender system => RaaS
- [SciVal] producto de elsevier, plataforma para acceder a datos bibliograficos, parece de pago


# Herramientas interesantes:
- [Part-Of-Speech Tagger (POS Tagger)](https://nlp.stanford.edu/software/tagger.shtml): Capaz de "leer" texto asignándole tipo de palabra realizando tokenización y lematización
- [Indri search engine](http://www.lemurproject.org/indri.php): Indri is a search engine that provides state-of-the-art text search and a rich structured query language for text collections of up to 50 million documents. _Alternativa a lucene_
- [Lucene]
- [Solr]: Alto nivel Lucene
- [elastic search]: framework de búsqueda mas usado
- [Graclus](http://www.cs.utexas.edu/users/dml/Software/graclus.html): Graph clustering software

# Bibliometric-enhanced-IR Bibliography
<https://github.com/PhilippMayr/Bibliometric-enhanced-IR_Bibliography>