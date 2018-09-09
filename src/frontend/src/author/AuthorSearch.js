import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Hits, LayoutResults, ActionBar, ActionBarRow, HitsStats, NoHits, Pagination} from "searchkit";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

import AuthorHitsTable from './AuthorHitsTable';

const directSortingFields = ["full_name.raw", "ugr_hindex", "ugr_cites"]
class AuthorSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { referencesLookup: null, rerank_method: "ES_default" }
    }
    changeSorting = (sorting_field, mode) => {
        if (directSortingFields.indexOf(sorting_field) !== -1)
            this.props.searchkit.setQueryProcessor((plainQueryObject) => {
                console.log("Before modification")
                console.log(plainQueryObject)
                let newSorting = {};
                newSorting[sorting_field] = mode;
                let sortingArray = []
                sortingArray.push(newSorting)
                plainQueryObject.sort = sortingArray
                console.log("After modification")
                console.log(plainQueryObject)
                //
                return plainQueryObject
            }
            );
        else
            this.props.searchkit.setQueryProcessor((plainQueryObject) => {return plainQueryObject});
    };

    handleRerankChange = (event) => {
        let newSorting = event.target.value;
    
        let mode  = newSorting === 'full_name.raw' ? "asc": "desc"
        this.changeSorting(newSorting, mode);
        
        this.setState({ rerank_method: event.target.value });
        this.props.searchkit.reloadSearch()

    }
    render() {
        return (

            <LayoutResults>
                <ActionBar>

                    <ActionBarRow>
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

                                        <MenuItem value={"ES_default"}>Default</MenuItem>
                                        <MenuItem value={"full_name.raw"}>Name</MenuItem>
                                        <MenuItem value={"ugr_hindex"}>H-Index</MenuItem>
                                        <MenuItem value={"ugr_cites"}>Cites</MenuItem>
                                        <MenuItem value={"combSum_cites_norm"}>CombSum Cites</MenuItem>
                                        <MenuItem value={"combMax_cites_norm"}>CombMax Cites</MenuItem>
                                        <MenuItem value={"combSum_hindex_norm"}>CombSum Hindex</MenuItem>
                                        <MenuItem value={"combMax_hindex_norm"}>CombMax Hindex</MenuItem>
                   
                                    </Select>
                                </FormControl>
                        </div>
                    </ActionBarRow>

                </ActionBar>
                <Hits mod="sk-hits-list" hitsPerPage={200} listComponent={<AuthorHitsTable rerank_method={this.state.rerank_method}/>} />
                <NoHits />
                <Pagination showNumbers={true} />

            </LayoutResults>
        );
    }
}

AuthorSearch.propTypes = {
    searchkit: PropTypes.object.isRequired

};

export default AuthorSearch;