import React, { Component } from 'react';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits, Pagination, SortingSelector, PageSizeSelector} from "searchkit";
import AuthorHitsTable from './AuthorHitsTable';

class AuthorSearch extends Component {
    render() {
        return (

                <LayoutResults>
                    <ActionBar>

                        <ActionBarRow>
                            <HitsStats />
                            <div style={{ marginRight: "15px" }}>
                                <label className="sk-hits-stats__info">Results per page: </label>

                                <PageSizeSelector options={[5, 10, 15, 20]} />
                            </div>
                            <div>
                                <label className="sk-hits-stats__info">Sorting: </label>
                                <SortingSelector options={[
                                    { label: "Relevance", field: "_score", order: "desc" },
                                    { label: "Cites", field: "ugr_cites", order: "desc" },
                                    { label: "H-Index", field: "ugr_hindex", order: "desc" }
                                ]} />
                            </div>
                        </ActionBarRow>

                    </ActionBar>
                    <Hits mod="sk-hits-list" hitsPerPage={10} listComponent={AuthorHitsTable} />
                    <NoHits />
                    <Pagination showNumbers={true} />

                </LayoutResults>
        );
    }
}

export default AuthorSearch;