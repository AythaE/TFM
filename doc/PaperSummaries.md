# BIR2014_1
### "A Study of Lexical Distribution in Citation Contexts through the IMRaD Standard"
#### Marc Bertin and Iana Atanassova:

- **IMRaD structure**: Standardized scientific article structure, Introduction, Method, Result and Discussion.
- Mutschke, P., Mayr, P., Schaer, P., Sure, Y.: Science models as value-added services for scholarly information systems. Scientometrics 89(1), 349–364 (2011)  **New model for IR in scholarly systems**
- The documment corpus is formed by XML documents which makes easy to parse.
- To extact the sections they use regular expressions to match the IMRaD std.
- Citation context is the sentence => important sentence segmentation
- Se cumple la propiedad de mundos pequeños con los verbos que aparecen en cada seccion.
- IR puede ser interesante asociar peso a términos en función de su posición en el texto.
- Ritchie, A., Teufel, S., Robertson, S.: Using terms from citations for ir: Some first results. In: Macdonald, C., Ounis, I., Plachouras, V., Ruthven, I., White, R. (eds.) Advances in Information Retrieval, Lecture Notes in Computer Science, vol. 4956, pp. 211–221. Springer Berlin Heidelberg (2008) **citation-based methods for Information Retrieval**

# BIR2014_5
### "On the Connection Between Citation-based and Topical Relevance Ranking: Results of a Pretest using iSearch"
#### Zeljko Carevic and Philipp Schaer

- **IR limitations**. Buckley, C.: Why current IR engines fail. Inf. Retr. 12, 6, 652–665 (2009).
- **Science Citation Index increase performance in scholary IR systems**. Pao, M.L.: Term and citation retrieval: A field study. Inf. Process. Manag. 29, 1, 95–112
(1993).
- **iSearch test collection**. Lykke, M. et al.: Developing a Test Collection for the Evaluation of Integrated Search. In: Gurrin, C. et al. (eds.) Advances in Information Retrieval. pp. 627–630 Springer, Berlin, Heidelberg (2010).
- **Novel IR approach using Bibliometric & IR with a tf*idf schema**. White, H.: Some new tests of relevance theory in information science. Scientometrics. 83,3, 653–667 (2010).
- **TF*IDF schema using co-citation as measure of similarity**:
    - TF: #citations of the seed document together with the target document to analize
    - DF: #overall citations for the target document in all iSearch collection
    - Method:
        1. Given seed document A retrieve all documents that cite A
        2. List of candidates created taken all citations from the documents in step 1
- **Result**: Using only internal references and relevant documents retrieve not enough documents to perform an analysis.
- **Further works**: Expand co-citation analysis using title, authors, journal and publication year along with the cites itself

# BIR2015_1
### "In Praise of Interdisciplinary Research through Scientometrics"
#### Guillaume Cabanac
