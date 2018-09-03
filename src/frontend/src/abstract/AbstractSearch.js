import React, { Component } from 'react';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits, Pagination, SortingSelector, PageSizeSelector
} from "searchkit";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import AbstractHitsListItem from './AbstractHitsListItem';
import AbstractHitsTable from './AbstractHitsTable';


const ABSTRACT_LOOKUP_SERVICE_URL = 'http://localhost:5000/abstract-references'
class AbstractSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { referencesLookup: null, rerank_method: "ES_default" }
    }
    componentDidMount() {
        // TODO call back for references lookup

        fetch(ABSTRACT_LOOKUP_SERVICE_URL).then(response => {
            response.json().then(json => {
                if (json.success) {

                    this.setState({ referencesLookup: json.data })
                }
                else {
                    //TODO display error message
                }
            })
        })
    }
    handleRerankChange = (event) => {
        console.log(event)
        this.setState({ rerank_method: event.target.value });
    }
    render() {
        return (

            <LayoutResults>
                <ActionBar>

                    <ActionBarRow>
                        <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%"}}>
                            <HitsStats />
                            {/* <div style={{ marginRight: "15px" }}>
                            <label className="sk-hits-stats__info">Results per page: </label>

                            <PageSizeSelector options={[5, 10, 15, 20]} />
                        </div> */}
                            <div>
                                <FormControl>
                                    {/* <label className="sk-hits-stats__info">Sorting: </label> */}
                                    <InputLabel htmlFor="sorting">Sorting</InputLabel>
                                    <Select
                                        value={this.state.rerank_method}
                                        onChange={this.handleRerankChange}
                                        inputProps={{
                                            name: 'sorting',
                                            id: 'sorting',
                                        }}
                                    >

                                        <MenuItem value={"ES_default"}>ES default</MenuItem>
                                        <MenuItem value={"combSum_cites_norm"}>CombSum Cites</MenuItem>
                                        <MenuItem value={"combMax_cites_norm"}>CombMax Cites</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <SortingSelector options={[
                                { label: "Relevance", field: "_score", order: "desc" },
                                { label: "Cites", field: "cites", order: "desc" },
                                { label: "Date", field: "date", order: "desc" }
                            ]} /> */}
                            </div>
                        </div>
                    </ActionBarRow>

                </ActionBar>
                <Hits mod="sk-hits-list" hitsPerPage={20} listComponent={<AbstractHitsTable referencesLookup={this.state.referencesLookup} rerank_method={this.state.rerank_method} />} />
                {/* <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={<AbstractHitsListItem referencesLookup={this.state.referencesLookup}/>} /> */}
                <NoHits />
                <Pagination showNumbers={true} />

            </LayoutResults>
        );
    }
}

export default AbstractSearch;