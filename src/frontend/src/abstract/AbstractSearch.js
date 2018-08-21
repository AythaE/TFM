import React, { Component } from 'react';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits, Pagination, SortingSelector, PageSizeSelector} from "searchkit";
import AbstractHitsTable from './AbstractHitsTable';

class AbstractSearch extends Component {
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
                                    { label: "Cites", field: "cites", order: "desc" },
                                    { label: "Date", field: "date", order: "desc" }
                                ]} />
                            </div>
                        </ActionBarRow>

                    </ActionBar>
                    <Hits mod="sk-hits-list" hitsPerPage={10} listComponent={AbstractHitsTable} />
                    <NoHits />
                    <Pagination showNumbers={true} />

                </LayoutResults>
        );
    }
}

export default AbstractSearch;