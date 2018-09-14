import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress, DialogActions, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AbstractHitsListItem.css'
import './AbstractDialog.css'
import { formatCommaList, formatDate, renderChipsFromList } from '../utils.js';


const ABSTRACT_SERVICE_URL = 'http://localhost:5000/abstract/'

class AbstractDialog extends Component {

    constructor(props) {
        super(props);


        this.state = {
            // If onlyDialog prop is true then set the dialog initial state to open
            open: props.onlyDialog ? true : props.initiallyOpen,
            fullLoaded: false,
            abstract: {}
        }
        // Result prop from ElasticSearch filled, use it as data source
        if (props.result && Object.getOwnPropertyNames(props.result).indexOf('_source') !== -1) {
            this.state.abstract = Object.assign({}, props.result._source, props.result.highlight);
            this.formatFields(this.state.abstract);


        }
        this.scopus_id = props.scopusId || props.result._id


    }

    getData() {
        if (!this.state.fullLoaded) {
            fetch(ABSTRACT_SERVICE_URL + this.props.scopusId).then(response => {
                response.json().then(json => {
                    if (json.success) {
                        this.formatFields(json.data);

                        this.setState({ abstract: json.data, fullLoaded: true })
                    }
                })
            })
        }

    }

    formatFields = (abstractData = null) => {
        abstractData = abstractData || this.state.abstract.authors;
        if (typeof abstractData.authors === 'object') {
            if (Array.isArray(abstractData.authors))
                this.authors = formatCommaList(abstractData.authors);
            else {
                const authorData = abstractData.authors;
                const authorIds = Object.getOwnPropertyNames(authorData);
                let author_list = [];

                authorIds.forEach(aid => { author_list.push(authorData[aid].name) });
                this.authors = formatCommaList(author_list);
            }
        }
        this.keywords = formatCommaList(abstractData.keywords);
        this.date = formatDate(abstractData.date.$date);
    }
    handleClick = () => {
        this.setState({ open: !this.state.open }, this.getData)
    }

    render() {

        return (
            <div>
                <Button classes={{ root: "title-button" }} onClick={this.handleClick}><h3 style={{ margin: "0" }}>{this.props.title}</h3></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClick}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="md"
                    fullWidth={true}>
                    <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>

                    {this.state.fullLoaded && <DialogContent>
                        <DialogContentText component="div">
                            <h3>Info</h3>
                            <ul style={{ listStyleType: "none" }}>
                                {this.state.abstract.authors && <li><b>Authors:</b> {this.authors}</li>}
                                {this.state.abstract.publication_name && <li><b>Publication name:</b> {this.state.abstract.publication_name}</li>}
                                {this.state.abstract.date && <li><b>Publication date:</b> {this.date}</li>}
                                {this.state.abstract.publisher && <li><b>Publisher:</b> {this.state.abstract.publisher}</li>}
                                {this.state.abstract.doi && <li><b>Doi:</b> {this.state.abstract.doi} </li>}


                            </ul>

                            {this.state.abstract.abstract && <ExpansionPanel>
                                <ExpansionPanelSummary classes={{ content: 'expansion-panel-no-margin' }} expandIcon={<ExpandMoreIcon />}>
                                    <h3>Abstract</h3>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {this.state.abstract.abstract}

                                </ExpansionPanelDetails>
                            </ExpansionPanel>}
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <h3>Scopus cites:  {this.state.abstract.cites}</h3>
                                <Button classes={{ root: "button" }} variant="contained" color="primary" href={this.state.abstract.scopus_url} target="_blank">
                                    See in Scopus
                                </Button>
                            </div>
                            {this.state.abstract.keywords.length > 0 && <div>
                                <h3>Keywords</h3>
                                {renderChipsFromList(this.state.abstract.keywords)}</div>
                            }
                            {this.state.abstract.subject_areas.length > 0 && <div>
                                <h3>Subject Areas</h3>
                                {renderChipsFromList(this.state.abstract.subject_areas)}</div>
                            }
                            {this.state.fullLoaded && this.state.abstract.references.length > 0 && this.props.referencesLookup &&
                                <div>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary classes={{ content: 'expansion-panel-no-margin' }} expandIcon={<ExpandMoreIcon />}>
                                            <h3>References</h3>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ul style={{ listStyleType: "none" }}>
                                                {this.state.abstract.references.map((ref_id, index) => {

                                                    return (
                                                        <li key={`${this.scopus_id}-refs-${index}`}>
                                                            <div className='ref-div'>
                                                                <AbstractDialog referencesLookup={this.props.referencesLookup} scopusId={ref_id} title={this.props.referencesLookup[ref_id].title} />
                                                                {formatCommaList(this.props.referencesLookup[ref_id].authors)}<br />
                                                                {formatDate(this.props.referencesLookup[ref_id].date.$date)}
                                                            </div>
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

                        <Button onClick={this.handleClick} color="secondary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>);
    }
}

AbstractDialog.propTypes = {
    result: PropTypes.object,
    referencesLookup: PropTypes.object,
    scopusId: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onlyDialog: PropTypes.bool

};

AbstractDialog.defaultProps = {
    initiallyOpen: false,
    onlyDialog: false
};
export default AbstractDialog;