import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AbstractHitsListItem.css'

import { formatCommaList, formatDate, renderChipsFromList } from '../utils.js';
import AbstractDialog from './AbstractDialog';


class AbstractHitsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullLoaded: false,
            fullData: {}
        }
        this.source = Object.assign({}, props.result._source, props.result.highlight);

        this.authors = formatCommaList(this.source.authors)
        this.keywords = formatCommaList(this.source.keywords)
        this.date = formatDate(this.source.date)
    }

    render() {
        return (
            <div>
                <div className="sk-hits-list-hit sk-hits-list__item sk-hits-list-hit__details" data-qa="hit">
                    <div className="sk-hits-list-hit__title">
                        {<AbstractDialog result={this.props.result} referencesLookup={this.props.referencesLookup} title={this.props.result._source.title} scopusId={this.props.result._id} />
                        }
                    </div>
                    <p className="sk-hits-list-hit__subtitle">{this.authors}</p>

                    {this.source.date && <p className="sk-hits-list-hit__subtitle">
                        Date: {this.date}
                        <span className="cites-separator" />
                        Cites: {this.source.cites}
                    </p>}
                    {!this.source.date && <p className="sk-hits-list-hit__subtitle">
                        Cites: {this.source.cites}
                    </p>}
                    {this.source.keywords.length > 0 && renderChipsFromList(this.source.keywords)}


                </div>

            </div >);
    }
};

AbstractHitsListItem.propTypes = {
    result: PropTypes.object.isRequired,
    referencesLookup: PropTypes.object

};

export default AbstractHitsListItem;