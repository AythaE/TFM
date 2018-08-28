import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress, DialogActions, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AbstractHitsListItem.css'

import { formatCommaList, formatDate, renderChipsFromList } from '../utils.js';
import AbstractDialog from './AbstractDialog';

const _ = require('lodash/core');

const mockupData = {
    "scopus_id": "2-s2.0-85020448290",
    "abstract": "Boosting collaborative or participatory consumption is a priority for the European Commission. It is in line with the provisions of the Europe 2020 Strategy, which proposes that consumption of goods and services should take place in accordance with smart, sustainable and inclusive growth. These have motivated us to develop an online community for collaborative consumption centered in the Senegalese community that travels by car from Europe to Africa named Teranga Go!. Carpooling relationships are based on the sense of a real existing community, social experiences among users, and connection through technology, where confidence is the key concept. To help creating values of confidence, trust and safety among the members of the Teranga Go! community, we have implemented an intelligent decision support system in the platform based on computing with words. The participants of a carpooling experience act as experts that assess the driver aptitudes and determine, together with the history of the driver, a linguistic value for the driver's karma which represents the collective opinion of people that have traveled with the driver. The karma is a public label attached to the site user profiles. A Multi-Expert Multi-Criteria Decision Making model is applied using Hesitant Fuzzy Linguistic Terms to represent the expert opinions.",
    "scopus_url": "https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85020448290&origin=inward",
    "keywords": [
        "Carpooling",
        "Collaborative consumption",
        "Hesitant fuzzy linguistic term set",
        "Linguistic 2-tuples",
        "Multicriteria decision making"
    ],
    "ugr_authors": null,
    "authors": {
        "56946096400": {
            "ugr_id": null,
            "name": "Ana M. Sanchez"
        },
        "6602587758": {
            "ugr_id": "40195",
            "name": "Pedro Villar"
        },
        "7006522713": {
            "ugr_id": null,
            "name": "Rosana Montes"
        },
        "7102347190": {
            "ugr_id": "22962",
            "name": "Francisco Herrera"
        }
    },
    "date": Date("2018-06-01T02:00:00.000+02:00"),
    "cites": 1,
    "publisher": " Elsevier Ltd ",
    "doi": "10.1016/j.asoc.2017.05.039",
    "publication_name": "Applied Soft Computing Journal",
    "title": "Teranga Go!: Carpooling Collaborative Consumption Community with multi-criteria hesitant fuzzy linguistic term set opinions to build confidence and trust",
    "subject_areas": [
        "Software"
    ],
    "references": [
        "2-s2.0-85016581991",
        "2-s2.0-85006766717"
    ]
}


class AbstractHitsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            fullLoaded: false,
            fullData: {}
        }
        this.source = Object.assign({}, props.result._source, props.result.highlight);

        this.authors = formatCommaList(this.source.authors)
        this.keywords = formatCommaList(this.source.keywords)
        this.date = formatDate(this.source.date)
    }

    componentDidMount() {
        // TODO call back for references lookup
        let data = this.state.fullData
        if (!data || Object.getOwnPropertyNames(data).length === 0) {
            // TODO conect with backend
            data = mockupData
        }
        this.setState({ fullLoaded: true, fullData: data })
    }

    loadFullAbstractData = () => {
        let data = this.state.fullData
        if (_.isEqual(data, {})) {
            // TODO conect with backend
            data = mockupData
        }
        this.setState({ fullLoaded: true, fullData: data })
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }
    renderDialog = () => {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleOpenInternal}
                aria-labelledby="responsive-dialog-title"
                maxWidth="md"
                fullWidth={true}>
                <DialogTitle id="responsive-dialog-title">{this.source.title}</DialogTitle>

                {this.state.fullLoaded && <DialogContent>
                    <DialogContentText component="div">
                        <h3>Info</h3>
                        <ul style={{ listStyleType: "none" }}>
                            {/* TODO make the authors clickable and search for all them abstracts or go to the page in author search */}
                            {this.source.authors.length > 0 && <li><b>Authors:</b> {this.authors}</li>}
                            {this.source.publication_name && <li><b>Publication name:</b> {this.source.publication_name}</li>}
                            {this.source.date && <li><b>Publication date:</b> {this.date}</li>}
                            {this.source.publisher && <li><b>Publisher:</b> {this.source.publisher}</li>}
                            {this.state.fullData.doi && <li><b>Doi:</b> {this.state.fullData.doi} </li>}


                        </ul>

                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <h3>Abstract</h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {this.source.abstract}

                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <h3>Scopus cites:  {this.source.cites}</h3>

                        {this.source.keywords.length > 0 && <div>
                            <h3>Keywords</h3>
                            {renderChipsFromList(this.source.keywords)}</div>
                        }
                        {this.source.subject_areas.length > 0 && <div>
                            <h3>Subject Areas</h3>
                            {renderChipsFromList(this.source.subject_areas)}</div>
                        }
                        {this.state.fullLoaded && this.state.fullData.references.length > 0 && <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <h3>References</h3>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <ul style={{ listStyleType: "none" }}>
                                        {this.state.fullData.references.map((ref_id, index) => {
                                            return (
                                                <li key={`${this.scopus_id}-refs-${index}`}>
                                                    {/* TODO make the title clickable */}
                                                    <p><b>{this.props.referencesLookup[ref_id].title}</b><br />
                                                        {formatCommaList(this.props.referencesLookup[ref_id].authors)}<br />
                                                        {formatDate(this.props.referencesLookup[ref_id].date)}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>}

                    </DialogContentText>
                </DialogContent>}

                {!this.state.fullLoaded &&
                    <DialogContent classes={{ "root": "perfect_centering" }}>
                        <CircularProgress color="secondary" />
                    </DialogContent>}

                <DialogActions>

                    <Button onClick={this.handleOpenInternal} color="secondary" autoFocus>
                        Close
            </Button>
                </DialogActions>
            </Dialog>);
    }
    render() {
        return (
            <div>
                <div className={`${this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))} ${this.props.bemBlocks.item("details")}`} data-qa="hit">
                    <div className={this.props.bemBlocks.item("title")}>
                        {<AbstractDialog result={this.props.result} referencesLookup={this.props.referencesLookup} title={this.props.result._source.title} scopusId={this.props.result._id} />
                        }
                    </div>
                    <p className={this.props.bemBlocks.item("subtitle")}>{this.authors}</p>

                    {this.source.date && <p className={this.props.bemBlocks.item("subtitle")}>
                        Date: {this.date}
                        <span className="cites-separator" />
                        Cites: {this.source.cites}
                    </p>}
                    {!this.source.date && <p className={this.props.bemBlocks.item("subtitle")}>
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