import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits
} from "searchkit";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import AbstractHitsTable from './AbstractHitsTable';


const ABSTRACT_LOOKUP_SERVICE_URL = 'http://localhost:5000/abstract-references'

const directSortingFields = ["title.raw", "hindex_norm", "cites"]

class AbstractSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { referencesLookup: null, rerank_method: "ES_default", searchkit: props.searchkit }
    }
    componentDidMount() {

        fetch(ABSTRACT_LOOKUP_SERVICE_URL).then(response => {
            response.json().then(json => {
                if (json.success) {

                    this.setState({ referencesLookup: json.data })
                }
            })
        })
    }
    changeSorting = (sorting_field, mode) => {
        if (directSortingFields.indexOf(sorting_field) !== -1)
            this.props.searchkit.setQueryProcessor((plainQueryObject) => {

                let newSorting = {};
                newSorting[sorting_field] = mode;
                let sortingArray = []
                sortingArray.push(newSorting)
                plainQueryObject.sort = sortingArray
                return plainQueryObject
            }
            );
        else
            this.props.searchkit.setQueryProcessor((plainQueryObject) => { return plainQueryObject });
    };

    handleRerankChange = (event) => {
        let newSorting = event.target.value;

        let mode = newSorting === 'title.raw' ? "asc" : "desc"
        this.changeSorting(newSorting, mode);

        this.setState({ rerank_method: event.target.value });
        this.props.searchkit.reloadSearch()
    }
    render() {
        return (

            <LayoutResults>
                <ActionBar>

                    <ActionBarRow>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%" }}>
                            <HitsStats />
                            <div>
                                <FormControl>
                                    <InputLabel htmlFor="sorting">Sorting</InputLabel>
                                    <Select
                                        value={this.state.rerank_method}
                                        onChange={this.handleRerankChange}
                                        inputProps={{
                                            name: 'sorting',
                                            id: 'sorting',
                                        }}
                                    >

                                        <MenuItem value={"ES_default"}>Default</MenuItem>
                                        <MenuItem value={"title.raw"}>Title</MenuItem>
                                        <MenuItem value={"hindex_norm"}>H-Index</MenuItem>
                                        <MenuItem value={"cites"}>Cites</MenuItem>
                                        <MenuItem value={"combSum_cites_norm"}>CombSum Cites</MenuItem>
                                        <MenuItem value={"combMax_cites_norm"}>CombMax Cites</MenuItem>
                                        <MenuItem value={"combSum_hindex_norm"}>CombSum Hindex</MenuItem>
                                        <MenuItem value={"combMax_hindex_norm"}>CombMax Hindex</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </ActionBarRow>

                </ActionBar>


                <Hits mod="sk-hits-list" hitsPerPage={1000} listComponent={<AbstractHitsTable referencesLookup={this.state.referencesLookup} rerank_method={this.state.rerank_method} />} />
                <NoHits />

            </LayoutResults>
        );
    }
}

AbstractSearch.propTypes = {
    searchkit: PropTypes.object.isRequired,
    searchbox: PropTypes.object
};

export default AbstractSearch;