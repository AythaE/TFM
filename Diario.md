# Diario
---------------

## 07/10/2017
Descarga de los diversos papers de los congresos  Bibliometric-enhanced Information Retrieval (BIR) desde <http://ceur-ws.org>, también se encuentran disponibles aquí los de los congresos Bibliometric-enhanced Information Retrieval and Natural Language Processing for Digital Libraries (BIRNDL), pero he preferido obviarlos por ahora.

## 20/02/2018
Acabado el libro _RI un enfoque práctico y multidisciplinar_  comenzando a leer editoriales BIR.

## 22/02/2018
Continuando trabajo previo, _BIR2014\_2_ parece muy interesante al utilizar técnicas de cienciometría para mejorar el proceso de RI en un sistema automático.

Concepto interesante: El **Principio de Polirepresentación**, se puede describir como el incremento de la relevancia de un documento si múltiples representaciones apuntan a él.

Medidas de citación:
- Citation count
- PageRank
- Co-citation clustering

Puede ser interesante empezar por _BIR2014_1_ y _BIR2014_5_ como introducciones del significado de las citas y el uso de la colección de prueba **iSearch** para plantear preguntas respectivamente.

Todo el mundo parece usar dicha colección para efectuar sus experimentos. Puede ser interesante si la encuentro, búsqueda preliminar infructuosa.

Conferencias previas: ISSI workshop [“Combining Bibliometrics and Information Retrieval”](http://www.gesis.org/en/events/conferences/issiworkshop2013/)

## 24/02/2018
Concepto interesante: **Contexto de la cita (citation context)**: buscar definición exacta pero imagino que se referira a l contexto textual que se encuentra en torno a cita en sí.

Parece importante: **Modelo de Marcia Bates**: estrategias para sistemas de búsqueda.

## 26/02/2018
Bases de datos bibliográficas más importantes:
- [Web of Science (WOS)](http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&search_mode=GeneralSearch&SID=D5Dirpg96ThopOFoBlP&preferencesSaved=), probablemente requiera acceso por vpn.
- [SCOPUS](https://www.scopus.com/search/form.uri?display=basic) de elsevier
- [ScienceDirect](https://www.sciencedirect.com/): tambien de elsevier, parece tener API gratuita junto con SCOPUS.
- [PLOS](https://www.plos.org/): Editorial abierta con múltiple revistas sobre diferentes temáticas, permite la descarga de papers en formato XML. Interesante para el parseo. Contiene metadatos

## 03/03/2018
los resumenes sobre los papers estarán en el fichero [`doc/PaperSummaries.md`](doc/PaperSummaries.md)

He leido el primero de los papers tardando unos 40 min al buscar información y extraer recursos interesantes. Igual es necesario reducir el número de papers del segundo sprint

## 12/03/2018
- **BIR2014_2**: Interesting concept, but too far away from search box user expect from a IR system. Could be interesting to apply key ideas of citation networks as underlying optimization for a more common IR system

- **BIR2014_4**
    - Use of citation information as static features for IR.
    - A lot of base citations from early works in the area
    - Buena fuente de informacion sobre metodologia de evaluacion de un sistema IR
    - Solo han evaluado utilizando información bibliografica, sin incluir contenido. Conjunto de test disperso.
    - Buscar mas trabajos de sus autores Haozhen Zhao and Xiaohua Hu

## 20/03/2018   
- **BIR2016_7**: recuperación de documentos basado en medidas de co-citación usando documentos recuperados del propio historial de búsqueda del usuario. Interesante la recuperación en 2 tiempos, usar un enfoque tradicional para buscar documentos y un modelo bibliométrico para buscar similares a los primeros documentos recuperados en la primera fase.
- _Larsen, B. References and citations in automatic indexing and retrieval systems: Experiments with the boomerang effect. PhD dissertation, Royal School of Library and Information Science, Copenhagen, Denmark (2004)_.


## 23/06/2018
- Estoy revisando la introuducción y me asaltan algunas dudas:
    - como evaluar un sistema de RI sin una colección de prueba o usuarios reales

## 27/06/2018

Comienzo las pruebas con elastic search. 

Lo he instlado via docker container en su version open source, ver [instrucciones](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html).


Para arrancar el contendor 

```shell
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch-oss:6.3.0
```

## 02/07/2018
Logrado montar el docker compose con cerebro y un nodo elasticSearch
curl -XPUT 'http://elasticsearch:9200/blog/user/dilbert' -d '{
 "name": "Dilbert Brown"
}'
Front end con buena pinta [dejavu](https://hub.docker.com/r/appbaseio/dejavu/)

necesario añadir -H 'Content-Type: application/json' por ES 6.x tiene comprobación explicita de tipos

Endpoint _bulk para enviar múltiples operaciones

Reranking en ES: <http://elasticsearch-learning-to-rank.readthedocs.io/en/latest/fits-in.html#what-the-plugin-does>

ES parece algo rigido y de alto nivel seguir investigando

Ver function_score, script_score 

Lenguajes de script admitidos Lucene Expressions Language y Painless Scripting Language

## 03/07/2018
Reunion con el tutor, necesario extraer los documentos de autores de la escuela, para ello ver el ranking de investigadores.

Los he extraido mediante web scraping ver [fichero](Exploring/web_scraping/investigadores_etsiit.py) que guarda en mongodb los resultados extraidos de la web.

Ver el siguiente [dataset](http://opendata.ugr.es/dataset/rankings-de-investigadores-ugrinvestiga-segun-citacion/resource/4937db08-d757-469d-9bee-96fee9f798f8) actualizado el Mayo 28, 2018. Misma información, algo atrasada pero para cargar en pandas directamente

Cuestiones:
1. De que cifras fiarse? UGR, Schoolar, ResearchGate y Scopus distintas cifras de citas y articulos
    1. Schoolar y research gate no Api, scopus si pero límites
    2. En alguna busqueda preliminar si se añade que sea de la universidad de granada separando por nombre y apellido se obtienen resultados decentes en scopus, para schoolar ya estan los link y los de research gate se pueden sacar del perfil por scraping

## 04/07/2018
Herramientas para scrap GS https://github.com/jonhurlock/Google-Scholar-Tools
He creado cuenta de dev en elsevier para dar de alta keys

Scopus api package https://scopus.readthedocs.io/en/latest/index.htmls

## 08/07/2018
He creado un script que busca en scopus todos los autores del dataframe probando varias combinaciones de sus nombres. Frecuentemente la búsqueda de autores en scopus devuelve varios resultados que pueden ser el mismo author u no.

Con el script he logrado obener algun resultado de 202 de los 214 autores buscados (94 % aprox)

Se podría filtrar más por la disciplina y sera necesario agrupar lo que sean similares,

Eliminado las filas duplicadas y salen un total de 397 autores de los 1424 recuperados

Se puede seguir filtrando como por ejemplo eliminando aquellos autores que no tengan obras en el area de computer sciences ('COMP') `unique_eids_df[unique_eids_df['areas'].str.contains('COMP', regex=False)]` pero se pierden autores (haciendo eso se mantienen 176 autores)

## 10/07/18

Filtrando resultados, ver funcion `explore_retrieved_data` de retrieve_auth_info.py: total 164 autores de los 214 buscados.

Ver como hacer alguna gráfica para explicar el filtrado en mathplotib <https://pandas.pydata.org/pandas-docs/stable/visualization.html>

Interesante barras, pie para pais y ciudad. 

Crear clases (comp_spa_granada, spa_granada, spa) dividiendo en un pie el 100% entre las clases en autores y artículos


## 13/07/18

Límites apis https://dev.elsevier.com/api_key_settings.html

Actualmente descargando abstacts en modo FULL para obtener las referencia de esas

Modificar clase `ScopusAbstact` para obtener authkeywords como estos
```xml
 <authkeywords>
        <author-keyword>Computing with words (CW)</author-keyword>
        <author-keyword>Information fusion</author-keyword>
        <author-keyword>Linguistic modeling</author-keyword>
        <author-keyword>Linguistic variables</author-keyword>
    </authkeywords>
```

Modificar tambien método `load_api_key` de get_content para poder cargar varias API key, que sea una lista y coja la siguiente en caso de error 429, cuota excedida

## 16/07/18

Todos los abstract por fin descargados, generando DF en [`./Exploring/scopus/generate_df_from_abstracts.py`](Exploring/scopus/generate_df_from_abstracts.py)

Limpiar los eid de los autores, ver [`./Exploring/scopus/retrieve_author_info.py`](Exploring/scopus/retrieve_author_info.py)

Que hacer con las medidas bibliométricas sobre citas e indice h tomar lo de investiga ugr aunque luego no se refleje en los documentos??

author impact factor how is calc, useful?

Las citas de scopus son citation_count o cited_by

Un total de 5670 abstract de 164 autores 


TODO:
- [x] Unificar autores ugr con autores scopus
- [x] Unificar autores por ugr id: combinando campos scopus: citas la suma, hindex el mayor, eid una lista, numero documentos la suma, url lista
- [x] unir abstracts a autores sustituyendo eid por ugr id y a su vez por ObjectID
- [x] filtrar referencias de los artículos para solo apuntar a referencias internas 
- [x] una vez hecho lo anterior sustituir eid por ObjectId
- [x] acabar el modelo para guardar las cosas en MongoDB


## 30/07/2018
Todos los datos en mongo, es hora de pasar a ES.

Interfaces usuario ES:
- Searchkit https://github.com/searchkit/searchkit mejor pinta, solo componentes front, no demasiado customizable
- Reactive search https://opensource.appbase.io/reactivesearch/ Más customizable, parece depender se uno de sus servicios de back, 


## 17/08/18
Crear e insertar documentos es https://sarahleejane.github.io/learning/python/2015/10/14/creating-an-elastic-search-index-with-python.html

Seleccionar tipos para índice ES: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html

Autores ya en indice, falta crear el de abstracts

## 18/08/18

Puede merecer la pena crear índices en mongo sobre los ugr_id y scopus_id

## 19/08/18

Ejemplo de start app con searchkit https://github.com/searchkit/searchkit-starter-app

Tabs: https://material-ui.com/api/tabs/

## 27/08/2018

Ranking combinations python https://github.com/diegoches/PyRanker/tree/develop

documentacion sobre function_score para modificar las consultas https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-function-score-query.html
Parece ser capaz de calcular una nueva puntacion de diversas maneras y combinarla directamente con la puntuación de ES.

Interesante precalcular las citas normalizadas para usar en la puntuacion directamente, También se podría combinar el índice h de los autores y normalizarlo (la media de los indices de los autores conocidos por ejemplo).

## 06/09/2018

Preparando para enviar segunda versión al tutor.

Cuestiones:
1. El título oficial por que se encuentra registrado el TFM es "Desarrollo de un prototipo de motor de búsqueda que incorpore técnicas bibliométricas para mejorar la recuperación", sin incluir "...de información" ¿puede haber problemas por poner otro?
2. Objetivo de evaluación no bastaría con concluir que no ha sido cumplido por las dificultades de la misma y la falta de tiempo esbozando una idea de realizar algunas encuestas a profesores de las escuela ya que son expertos en la materia del sistema.
3. Apartado de sofware en planificación está igual en el TFG que me adjuntaste.
4. En la sección Metodologia de desarrollo detallo la Ingenieria del software que he llevado a cabo, que es escasa lo sé, pero realista, no me voy a poner ahora a escribir especificaciones de requisitos, a hacer diagramas detallados ya una vez finalizado el desarrollo, ya que me parecen artefactos totalmente artificiales que no utiliza prácticamente nadie. Puedo añadir algún caso de uso básico con un diagrama general y una breve explicación de cada uno, esos casos de uso pueden ser por ejemplo realizar una búsqueda o cambiar la ordenación de los resultados ya que no creo que el sistema tenga mucha más funcionalidad de cara al usuario 
5. La planificación temporal se encuentra en la sección homonima del capítulo Planificación
6. Respecto a la arquitectura del sistema que te parece la ide de añadir en el diseño un breve esbozo con una idea de una arquitectura básica cliente servidor con un servidor de búsqueda que se conecte a una BD y un cliente que realice consultas sobre ese servidor y ya en el final del desarrollo incluir este diagrama detallado con las tecnologías concretas.
7. No te parece buena idea que el apartado de tenicas y herramientas tenga un capítulo propio donde recoger la información sobre las mismas y desde el apartado del desarrollo simplemente mentar las herramientas o librerías sin entrar en detalle

**Detallar los campos usados en las consultas de Searchkit y el tema del prefix**


## 08/09/2018
Algo lenta la busqueda de abstracts, se bloquea el input, puede ser mejor desactivar la busqueda segun escribes

## 10/09/2018

TODO:
- [x] Escribir apartado Introducción > Organización de la memoria
- [x] Escribir apartado Técnicas y Herramientas
- [x] Escribir apartado Desarrollo > Script 8
- [x] Escribir apartado Conclusiones y Trabajos Futuros
- [x] Escribir resumen
- [x] Escribir resumen inglés
- [x] Añadir cuadro resumen ordenaciones
- [x] Eliminar objetivo evaluación y a trabajos futuros
- [x] Añadir arquitectura esbozada en diseño y detallada al final del desarrollo
- [x] Fusionar técnicas y herramientas en el primer apartado de la memoria o diseño
- [x] Análisis con historias de usuario
- [x] Revisar números footnotes
- [ ] Limpiar código y documentar un poco frontend


## 11/09/2018

Descripción de apartados de la memoria del TFM:
- [x] **Título del trabajo**
- [x] **Nombre del autor**
- [x] **Nombre del tutor/tutores**
- [x] **Índice de los contenidos**
- [x] **Resumen**: Se resumirán:
    - [x] los objetivos planteados, 
    - [x] la metodología seguida, 
    - [x] los resultados alcanzados, y 
    - [x] las conclusiones del trabajo
- [x] **Introducción**: Debe incluir:
    - [x] Contextualización del trabajo: Temática   y/o   problema   que   se   aborda   (incluyendo   interés   y adecuación a los objetivos del TFM).
- [x] **Antecedentes**
- [x] **Objetivos**: Exposición precisa del aporte al conocimiento o a la práctica profesional de la Ingeniería Informática que se quiere llevar a cabo en el trabajo que se presenta. Incluyendo un análisis de la utilidad y beneficios conseguidos al alcanzarlos.
- [x] **Planificación inicial del Trabajo** a diferentes niveles: temporal, económico y/o de recursos.
- [x] **Metodología**:  se   describirá   la   metodología   que   se   utilizó   para   la consecución de los objetivos perseguidos. Se incluirá la descripción deherramientas, tecnologías y técnicas utilizadas, así como una justificación de por qué se hizo así.
- [x] **Desarrollo del Trabajo**: se expondrá de manera ordenada:
    - [x] El estudio profundo del estado del arte relativo al trabajo realizado.
    - [x] Las actuaciones y trabajo  realizado para conseguir los objetivos.
    - [x] Si procede, se incluirán los ajustes realizados en la planificación inicial. 
- [x] **Resultados**:  Se   realizará   una   exposición   ordenada   de   los   resultados, incluyendo  pruebas  y   análisis  de  los  mismos.  Es  recomendable   incluir prototipos o demostradores del trabajo, así como estudios comparativos ilustrados   mediante   tablas   y/o   gráficos.     Deben   incluirse     comentarios relacionándolos   entre   sí   y   con   los   descritos   en   la   introducción.  Este apartado   podría   integrarse   dentro   del   apartado   anterior   (Desarrollo   del Trabajo).
- [x] **Discusión y conclusiones**: Se deben destacar los aspectos novedosos y relevantes del estudio y las conclusiones que se derivan de ellos. No se deben repetir con detalle los datos u otra información ya presentados en las secciones   anteriores.   Se     deben   relacionar   las   conclusiones   con   los objetivos del trabajo, evitando afirmaciones no contrastadas y conclusiones no respaldadas suficientemente por  los datos disponibles.
- [x] **Bibliografía**: Incluirá todas las referencias de libros, webs, documentos y artículos consultados durante la utilización del trabajo.
- [x] **Anexo**:  se   podrá   anexar   toda   aquella   documentación   que   sea relevante para la compresión y clarificación del trabajo desarrollado

## 12/09/2018

Preguntas:
- Manual de usuario necesario? solo hay un cuadro de búsqueda, una pestaña para seleccionar entre búsqueda de autores y abstract y un selector de ordenación.
- Manual de usuario y técnico
- Solo entregar memoria no?
- Meter en introducción 

Estructura defensa
15 minutos de defensa + 5 demostracion 