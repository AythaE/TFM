import React, { Component } from 'react';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits, Pagination, SortingSelector, PageSizeSelector
} from "searchkit";

import AbstractHitsListItem from './AbstractHitsListItem';


const ABSTRACT_LOOKUP_SERVICE_URL = 'http://localhost:5000/abstract-references'
class AbstractSearch extends Component {
    constructor(props){
        super(props);
        this.state = {referencesLookup: null}
    }
    componentDidMount() {
        // TODO call back for references lookup

        fetch(ABSTRACT_LOOKUP_SERVICE_URL).then(response => {
            response.json().then(json => {
                if (json.success) {

                    this.setState({referencesLookup: json.data})
                }
                else {
                    //TODO display error message
                }
            })
        })
    }
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
                <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={<AbstractHitsListItem referencesLookup={this.state.referencesLookup}/>} />
                <NoHits />
                <Pagination showNumbers={true} />

            </LayoutResults>
        );
    }
}

export default AbstractSearch;