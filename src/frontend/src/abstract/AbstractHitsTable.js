import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AbstractHitsListItem from './AbstractHitsListItem'
import { normalizeHitsScore, combSum, resortHits, generateId, combMax } from '../utils';

class AbstractHitsTable extends Component {

    rerankHits = (hits, debug= false) => {
        switch (this.props.rerank_method) {
            case "combSum_cites_norm":
                hits = normalizeHitsScore(this.props.hits, debug);
                hits = combSum(hits, 'cites_norm', debug);
                hits = resortHits(hits, debug);
                break;
            case "combMax_cites_norm":
                hits = normalizeHitsScore(this.props.hits, debug);
                hits = combMax(hits, 'cites_norm', debug);
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
        let key_prop = generateId();
        return (
            <div style={{marginLeft: "5px"}}>
                {hits.map((hit, index) => {
                    return (
                        <AbstractHitsListItem key={key_prop + '-' + index} result={hit} referencesLookup={this.props.referencesLookup} />
                    );
                })}

            </div>
        )
    }
}
AbstractHitsTable.propTypes = {
    referencesLookup: PropTypes.object,
    rerank_method: PropTypes.string
};
export default AbstractHitsTable;