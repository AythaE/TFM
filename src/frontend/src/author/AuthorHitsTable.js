import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AuthorView from './AuthorView';
import { normalizeHitsScore, combSum, resortHits, combMax } from '../utils';

class AuthorHitsTable extends Component {

  rerankHits = (hits, debug = false) => {
    switch (this.props.rerank_method) {
      case "combSum_cites_norm":
        hits = normalizeHitsScore(this.props.hits, debug);
        hits = combSum(hits, 'ugr_cites_norm', debug);
        hits = resortHits(hits, debug);
        break;
      case "combMax_cites_norm":
        hits = normalizeHitsScore(this.props.hits, debug);
        hits = combMax(hits, 'ugr_cites_norm', debug);
        hits = resortHits(hits, debug);
        break;
      case "combSum_hindex_norm":
        hits = normalizeHitsScore(this.props.hits, debug);
        hits = combSum(hits, 'ugr_hindex_norm', debug);
        hits = resortHits(hits, debug);
        
        break;
      case "combMax_hindex_norm":
        hits = normalizeHitsScore(this.props.hits, debug);
        hits = combMax(hits, 'ugr_hindex_norm', debug);
        hits = resortHits(hits, debug);
        break;
      default:
      // Use normal ES order
    }
    return hits;

  };
  render() {
    let hits = this.props.hits;
    hits = this.rerankHits(hits, true);
    return (
      <div style={{ width: '100%', boxSizing: 'border-box', padding: 8 }}>
        <table className="sk-table sk-table-striped" style={{ width: '100%', boxSizing: 'border-box' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cites</th>
              <th>H-Index</th>

            </tr>
          </thead>
          <tbody>
            {hits.map(hit => (
              <tr key={hit._id}>
                <td><AuthorView name={hit._source.full_name} ugr_id={hit._id} /></td>
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

AuthorHitsTable.propTypes = {
  rerank_method: PropTypes.string
};
export default AuthorHitsTable;