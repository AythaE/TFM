import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './theme.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  SearchkitManager, SearchkitProvider, SearchBox, Layout, TopBar, LayoutBody} from "searchkit";
import AuthorSearch from './author/AuthorSearch';
import AbstractSearch from './abstract/AbstractSearch';

const authorSearchkit = new SearchkitManager("http://localhost:9200/author");
const abstractSearchkit = new SearchkitManager("http://localhost:9200/abstract");

const authorTab = 0;
const abstractTab = 1;


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedTab: authorTab,
      searchkit: authorSearchkit
    };

  }


  handleChange = (event, value) => {
    let searchkit;
    if (value === authorTab)
      searchkit = authorSearchkit
    else
      searchkit = abstractSearchkit
    this.setState({ selectedTab: value, searchkit: searchkit });
  };

  render() {
    return (
      <SearchkitProvider searchkit={this.state.searchkit}>
        <Layout>
          <TopBar>
            {/* <div style={{ display: "flex", flexDirection: "column", width: "100%" }}> */}
            {/* <div> */}
            <div className="my-logo" style={{ display: "flex" }}>
              <img src={logo} className="App-logo" alt="App logo" style={{ height: "auto" }} /> Bibliometry Search Engine
                </div>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["nick_name^1", "full_name^10"]}
            />

          </TopBar>
          <LayoutBody>

            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
              <Tabs value={this.state.selectedTab} onChange={this.handleChange} centered={true} classes={{"root":"primary_light_color_background"}} >
                <Tab label="Author search" />
                <Tab label="Abstract search" />
              </Tabs>
              {this.state.selectedTab === authorTab && <AuthorSearch />}
              {this.state.selectedTab === abstractTab && <AbstractSearch/>}
            </div>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
