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

# BIR2015_4
### "An Experimental Platform for Scholarly Article Recommendation"
#### Ian Wesley-Smith, Ralph Dandrea, and Jevin West

- recommendation algorithm to validate **EigenFactor Recommends**.
- Bibliometry based recomenders:
    - **PageRank** Lawrence Page, Sergey Brin, Rajeev Motwani, and Terry Winograd. The pagerank citation ranking: Bringing order to the web. 1999
    - **ArticleRank** Jiang Li and Peter Willett. ArticleRank: a PageRank?based alternative to numbers of citations for analysing citation networks. Aslib Proceedings, 61(6):605–618, November 2009
    - **AuthorRank** Xiaoming Liu, Johan Bollen, Michael L. Nelson, and Herbert Van de Sompel. Co-authorship networks in the digital library research community. Inf. Process. Manage., 41(6):1462–1480, December 2005
    - **Y-factor** Johan Bollen, Marko A. Rodriquez, and Herbert Van de Sompel. Journal status. Scientometrics, 69(3):669–687, December 2006
- eigenvector centrality methods like page rank. Based on Eigenvector centrality for citation network

# BIR2014_2
### "Systematic retrieval of scientific literature based on citation relations: Introducing the CitNetExplorer tool"
#### Nees Jan van Eck and Ludo Waltman
- Network analysis applied to citation networks. UI really similar to gephi
- Writen in Java
- Available in <http://www.citnetexplorer.nl/>
- perform netowork task like community detection
- Interesting concept, but too far away from search box user expect from a IR system. Could be interesting to apply key ideas of citation netoworks as underlying optimization for a IR system

# BIR2014_4
### "Language Model Document Priors based on Citation and Co-citation Analysis"
#### Haozhen Zhao and Xiaohua Hu
- **first article talking about combination of IR and Bibliometrics**: H. D. White and K. W. McCain. Visualizing a discipline: An author co-citation analysis of information science, 1972-1995. Journal of the American Society for Information Science, 49(4):327–355, 1998.

- **query independent evidences or static features for IR**:Nick Craswell, Stephen Robertson, Hugo Zaragoza, and Michael Taylor. Relevance weighting for query independent evidence. In Proceedings of the 28th Annual International ACM SIGIR Conference on Research and Development in Information Retrieval, SIGIR ’05, pages 416–423, New York, NY, USA, 2005. ACM.

- **Language Model Document Priors**: Wessel Kraaij, Thijs Westerveld, and Djoerd Hiemstra. The importance of prior probabilities for entry page search. In Proceedings of the 25th Annual International ACM SIGIR Conference on Research and Development in Information Retrieval, SIGIR ’02, pages 27–34, New York, NY, USA, 2002. ACM.
- indri software
- **best practice for enhance a IR system**: Diana Ransgaard Sørensen, Toine Bogers, and Birger Larsen. An exploration of retrieval-enhancing methods for integrated search in a digital library. In TBAS 2012: ECIR Workshop on Task-based and Aggregated Search, pages 4–8, 2012.
- query-likelihood language model [4]
- Using Bayesian rule, P (D|Q) => P (D|Q) ∝ P (Q|D)P(D) where:
    - Q query
    - D document
    - P (D|Q) probability for a user to query for D
    - P(D) _document prior_
- Graph clustering software Graclus http://www.cs.utexas.edu/users/dml/Software/graclus.html
- Jelinek–Mercer (JM)
- Dirichlet
- two-stage smoothing
- Measurements for retrieval effectiveness: Mean Average Precision (MAP), Precision at 10 (P@10), nDCG [8] and BPREF[2].


# BIR2017_11
### "Extending a Research-Paper Recommendation System with Scientometric Measures"
#### Sophie Siebert, Siddarth Dinesh, and Stefan Feyer
- **List of bibliometric measures**:Wildgaard, L. ; Schneider, J. W. ; Larsen, B. : A review of the characteristics of 108 author-level bibliometric indicators. In: Scientometrics 101 (2014), Nr. 1, S. 125–158
- **Scientometrics concept**: Hood, W. ; Wilson, C. : The literature of bibliometrics, scientometrics, and informetrics. In: Scientometrics 52 (2001), Nr. 2, S. 291–314
- **Altmetrics**: Alternative metrics(social media, blogs etc): Brigham, T. J.: An introduction to altmetrics. In: Medical reference services quarterly 33 (2014), Nr. 4, S. 438–447
- **Rank papers**:Behnert, C. ; Lewandowski, D. : Ranking search results in library information systems-considering ranking approaches adapted from web search engines. In: The Journal of Academic Librarianship 41 (2015), Nr. 6, S. 725–735
    - ’text statistics’
    - _’popularity’_:
    - ’freshness’
    - ’locality and vailability’
    - ’content properties’
    - ’user’s background’
- **Example of a search engine that use citation, h-index and recency**:Bethard, S. ; Jurafsky, D. : Who should I cite: learning literature search models from citation behavior. In: Proceedings of the 19th ACM internationa  conference on Information and knowledge management ACM, 2010, S. 609–618
- **Correlation between readership and citations**: Thelwall, M. : Why do papers have many Mendeley readers but few Scopus-indexed citations and vice versa? In: Journal of Librarianship and Information Science (2015), S. 0961000615594867
- **Scientometry measures for ranking**:
    - Readers count: Turns to be the best
    - Readership count normalized by the age of the paper _good papers need time to become famous_ = Rc / (now-publishYear +1)
    - Readership normalized by the number of authors _Paper with many authors are likely to be more famous because they are wider spread_ =  Rc/#authors
- Best results re-ranking short list of candidates (10) or long (50+)


# BIR2016_7
### "Bag of Works Retrieval: TF*IDF Weighting of Co-cited Works"
#### Howard D. White
- TF: counts of documents co-cited with the seed document in later papers
- IDF:
    - DF scores are the total citation counts for documents in the database
    - I inverse to favor works specifically related with seed instead of general documents used in many places
- Co-citation not widely used as is citation in IR system. Only CiteSeer use it, neither WoS, Scopus or GS
- Netflix and Amazon recomender systems use co-purchasing as motor.
- Related with BIR2014_5
- looks important author Marcia J. Bates
- White 2010

# BIR2015_5
### "Extending search facilities via bibliometric-enhanced stratagems"
#### Zeljko Carevic and Philipp Mayr
- Bates, M.J.: The design of browsing and berrypicking techniques for the online search interface. Online Review 13(5), 407–424 (May 1989), http://www.emeraldinsight.com/doi/abs/10.1108/eb024320
- Bates, M.J.: Where should the person stop and the information search interface start? Information Processing & Management 26(5), 575–591 (Jan 1990), http://linkinghub.elsevier.com/retrieve/pii/0306457390901039
- **Move**: simple search activity like entring a query or selecting a document.
- **Tactics**: combination of moves like breaking a complex search in multiple sub queries.
- **Stratagem**: complex moves and/or tactics involves particular id search domain to be productive for user and a way to organize documents in that domain.
- **Strategy**: Combination of above that satisfies an information need.
-  _Focus: develop Move, Tactics and Stratagem support to help users in DLs_

- **IRM Project**: scholarly Information Retrieval using Scientometrics measurs for re-ranking results. 0Mutschke, P., Mayr, P., Schaer, P., Sure, Y.: Science models as value-added services for scholarly information systems. Scientometrics 89(1), 349–364 (Jun 2011), http://arxiv.org/abs/1105.2441 http://www.springerlink.com/index/10.1007/s11192-011-0430-x

- context-preserving move: Keep context between moves, example faceted broswing, select one search result and combine it with the original search query
- Context free move: non preserving, like select one author of the search set and looks for all its works.
- **Journal run**: stratagem based on order paper by date and publication journal. Rearrange the ranking from document based to journal based using a bibliometic measure to sort journals.
- **bibliographic coupling** 2 papers are related if they have common references. Kessler, M.M.: Bibliographic coupling between scientific papers. American Documentation 14(1), 10–25 (1963), http://dx.doi.org/10.1002/asi.5090140103


# BIR2014_3
### "Exploiting Information Needs and Bibliographics for Polyrepresentative Document Clustering"
#### Muhammad Kamran Abbasi and Ingo Frommholz
- **Polyrepresentation**: use of several data representations to integrate context and interpretation of different actors. This representations could come for different actors or from the same actor but with distinct purposes and functionality. Ingwersen, P., Järvelin, K.: The turn: integration of information seeking and retrieval in context. Springer-Verlag New York, Inc., Secaucus, NJ, USA (2005)
    - bibliographic information i.e. authors, references and the citation context could be exploited as representations.

- bradfordizing: Mayr, P., Mutschke, P.: Bibliometric-enhanced retrieval models for big scholarly information systems. IEEE International Conference on Big Data (2013)
- Connections between IR, bilbiometric and relevance theory: White, H.: Combining bibliometrics, information retrieval, and relevance theory, Part 2: Some implications for information science. JASIST 58(4) (2007) 583–605
- suitability of the bibliometirc measures for enhancement of retrieval in scholarly systems is presented and evaluated:
    - Mayr, P., Mutschke, P.: Bibliometric-enhanced retrieval models for big scholarly information systems. IEEE International Conference on Big Data (2013)
    - Mutschke, P., Mayr, P., Schaer, P., Sure, Y.: Science models as value-added services for scholarly information systems. Scientometrics 89(1) (June 2011) 349–364
- Optimum Clustering Framework (OCF) Fuhr, N., Lechtenfeld, M., Stein, B., Gollub, T.: The Optimum Clustering Framework: Implementing the Cluster Hypothesis. Information Retrieval 14 (2011)
- Terrier IR platform [17] & CombSum [18] BM25 weights


# BIR2018_3
### Testing a Citation and Text-Based Framework for Retrieving Publications for Literature Reviews
#### M. Janina Sarol, Linxi Liu, and Jodi Schneider

Code: https://github.com/janinaj/lit-review-search

Complicate to perfom literature reviews with increasing amount of scholary works. A lot of time is spended for diferente literary review types

Framework: From seed documents using them citatiion network to find the documents with strong citation and topical relationship with the seed ones.

**hybrid methods text + citation**:  Silva, F.N., Amancio, D.R., Bardosova, M., Costa, L.d.F., Oliveira, O.N.: Using
network science and text analytics to produce surveys in a scientific topic. Journal
of Informetrics 10(2) (2016) 487–502

Steps:
- Select seed
- Search them citation space: => Using scopus api
    - Papers cited by seed _references_
    - Papers that cite a seed _citations_
    - Papers that cite the same articles than the seed _Co-Citing_
    - Papers that are cited by the same articles that cite a seed _Co-Cited_
- Filter:
    - *Citation-based*: Only keep direct citation to/from seed and the co-citing/cited that **shares 10% of citations**: Belter, C.W.: Citation analysis as a literature search method for systematic re-views. Journal of the Association for Information Science and Technology 67(11) (2016) 2766–2777
    - *Text-based*: using phrases from abstract. keep works with at least 1 bigram-trigram common with seed abstract. To extract phrases: **Rapid Automatic Keyword Extraction (RAKE) algorithm**: Rose, S., Engel, D., Cramer, N., Cowley, W.: Automatic keyword extraction from individual documents. Text Mining: Applications and Theory (2010) 1–20

Nice results using all combinations of 3-seed articles they always find the rest of the available papers (not all in scopus) reducing the numbers of total studies retrievec  