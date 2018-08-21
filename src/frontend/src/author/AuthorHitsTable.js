import React, { Component } from 'react';

import AuthorView from './AuthorView';

class AuthorHitsTable extends Component {

    render(){
      const { hits } = this.props
      return (
        <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
          <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cites</th>
                <th>H-Index</th>

              </tr>
            </thead>
            <tbody>
              {hits.map( hit => (
                <tr key={hit._id}>
                  <td><AuthorView name={hit._source.full_name} ugr_id= {hit._id}/></td>
                  <td>{hit._source.ugr_cites}</td>
                  <td>{hit._source.ugr_hindex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

export default AuthorHitsTable;