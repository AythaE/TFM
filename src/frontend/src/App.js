import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './theme.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  SearchkitManager, SearchkitProvider, SearchBox, Layout, TopBar, LayoutBody
} from "searchkit";
import AuthorSearch from './author/AuthorSearch';
import AbstractSearch from './abstract/AbstractSearch';
import { Button } from '@material-ui/core';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

// Declare both search indexes
const authorSearchkit = new SearchkitManager("http://localhost:9200/author");
const abstractSearchkit = new SearchkitManager("http://localhost:9200/abstract");

// abstractSearchkit.setQueryProcessor((plainQueryObject) => {
//   console.log("Before modification")
//   console.log(JSON.stringify(plainQueryObject))

//   if ('query' in plainQueryObject) {
//     const originalQuery = Object.assign({}, plainQueryObject.query)

//     plainQueryObject.query = {
//       "function_score": {
//         "query": originalQuery,
//         "field_value_factor": {
//           "field": "cites",
//           "missing": 0
//         },
//         "boost_mode": "sum"
//       }
//     }

//     console.log("After modification")
//     console.log(JSON.stringify(plainQueryObject))
//     return plainQueryObject
//   }
// });
// First search to initialize properly
abstractSearchkit._search();
authorSearchkit._search();

const authorTab = 0;
const abstractTab = 1;


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: abstractTab,
      searchkit: abstractSearchkit
    };
  }

  handleChange = (event, value) => {
    let searchkit;
    if (value === authorTab)
      searchkit = authorSearchkit
    else
      searchkit = abstractSearchkit
    searchkit._search();
    this.setState({ selectedTab: value, searchkit: searchkit });
  };

  render() {
    return (
      <SearchkitProvider searchkit={this.state.searchkit}>
        <Layout>
          <TopBar>

            <div className="my-logo perfect_centering" >
              <h1>BiblioIR</h1>
            </div>
            {this.state.searchkit === authorSearchkit &&
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={["nick_name^1", "full_name^10"]} />
            }
            {this.state.searchkit === abstractSearchkit &&
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={["abstract", "title", "keywords", "subject_areas", "authors"]} />
            }

          </TopBar>
          <LayoutBody>

            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
              <Tabs value={this.state.selectedTab} onChange={this.handleChange} centered={true} classes={{ "root": "primary_light_color_background" }} >
                <Tab label="Author search" />
                <Tab label="Abstract search" />
              </Tabs>
              {/* <Button variant='fab' color="primary" classes={{fab: "fab"}} aria-label="Scroll to top"> <UpIcon /></Button> */}

              {this.state.selectedTab === authorTab && <AuthorSearch />}
              {this.state.selectedTab === abstractTab && <AbstractSearch />}

            </div>
          </LayoutBody>
        </Layout>

      </SearchkitProvider>
    );
  }
};

export default App;
