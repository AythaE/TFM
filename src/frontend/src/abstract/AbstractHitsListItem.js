import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AbstractHitsListItem.css'

import { formatCommaList, formatDate, renderChipsFromList } from '../utils.js';
import AbstractDialog from './AbstractDialog';


class AbstractHitsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // open: true,
            fullLoaded: false,
            fullData: {}
        }
        this.source = Object.assign({}, props.result._source, props.result.highlight);

        this.authors = formatCommaList(this.source.authors)
        this.keywords = formatCommaList(this.source.keywords)
        this.date = formatDate(this.source.date)
    }

    // componentDidMount() {
    //     // TODO call back for references lookup
    //     let data = this.state.fullData
    //     if (!data || Object.getOwnPropertyNames(data).length === 0) {
    //         // TODO conect with backend
    //         data = mockupData
    //     }
    //     this.setState({ fullLoaded: true, fullData: data })
    // }

    // loadFullAbstractData = () => {
    //     let data = this.state.fullData
    //     if (_.isEqual(data, {})) {
    //         // TODO conect with backend
    //         data = mockupData
    //     }
    //     this.setState({ fullLoaded: true, fullData: data })
    // }

    // handleClick = () => {
    //     this.setState({ open: !this.state.open })
    // }
    // renderDialog = () => {
    //     return (
    //         <Dialog
    //             open={this.state.open}
    //             onClose={this.handleOpenInternal}
    //             aria-labelledby="responsive-dialog-title"
    //             maxWidth="md"
    //             fullWidth={true}>
    //             <DialogTitle id="responsive-dialog-title">{this.source.title}</DialogTitle>

    //             {this.state.fullLoaded && <DialogContent>
    //                 <DialogContentText component="div">
    //                     <h3>Info</h3>
    //                     <ul style={{ listStyleType: "none" }}>
    //                         {/* TODO make the authors clickable and search for all them abstracts or go to the page in author search */}
    //                         {this.source.authors.length > 0 && <li><b>Authors:</b> {this.authors}</li>}
    //                         {this.source.publication_name && <li><b>Publication name:</b> {this.source.publication_name}</li>}
    //                         {this.source.date && <li><b>Publication date:</b> {this.date}</li>}
    //                         {this.source.publisher && <li><b>Publisher:</b> {this.source.publisher}</li>}
    //                         {this.state.fullData.doi && <li><b>Doi:</b> {this.state.fullData.doi} </li>}


    //                     </ul>

    //                     <ExpansionPanel>
    //                         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
    //                             <h3>Abstract</h3>
    //                         </ExpansionPanelSummary>
    //                         <ExpansionPanelDetails>
    //                             {this.source.abstract}

    //                         </ExpansionPanelDetails>
    //                     </ExpansionPanel>

    //                     <h3>Scopus cites:  {this.source.cites}</h3>

    //                     {this.source.keywords.length > 0 && <div>
    //                         <h3>Keywords</h3>
    //                         {renderChipsFromList(this.source.keywords)}</div>
    //                     }
    //                     {this.source.subject_areas.length > 0 && <div>
    //                         <h3>Subject Areas</h3>
    //                         {renderChipsFromList(this.source.subject_areas)}</div>
    //                     }
    //                     {this.state.fullLoaded && this.state.fullData.references.length > 0 && <div>
    //                         <ExpansionPanel>
    //                             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
    //                                 <h3>References</h3>
    //                             </ExpansionPanelSummary>
    //                             <ExpansionPanelDetails>
    //                                 <ul style={{ listStyleType: "none" }}>
    //                                     {this.state.fullData.references.map((ref_id, index) => {
    //                                         return (
    //                                             <li key={`${this.scopus_id}-refs-${index}`}>
    //                                                 {/* TODO make the title clickable */}
    //                                                 <p><b>{this.props.referencesLookup[ref_id].title}</b><br />
    //                                                     {formatCommaList(this.props.referencesLookup[ref_id].authors)}<br />
    //                                                     {formatDate(this.props.referencesLookup[ref_id].date)}</p>
    //                                             </li>
    //                                         );
    //                                     })}
    //                                 </ul>

    //                             </ExpansionPanelDetails>
    //                         </ExpansionPanel>
    //                     </div>}

    //                 </DialogContentText>
    //             </DialogContent>}

    //             {!this.state.fullLoaded &&
    //                 <DialogContent classes={{ "root": "perfect_centering" }}>
    //                     <CircularProgress color="secondary" />
    //                 </DialogContent>}

    //             <DialogActions>

    //                 <Button onClick={this.handleOpenInternal} color="secondary" autoFocus>
    //                     Close
    //         </Button>
    //             </DialogActions>
    //         </Dialog>);
    // }
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