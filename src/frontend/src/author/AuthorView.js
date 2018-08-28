import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Icon } from '@material-ui/core';

import './AuthorView.css';

const AUTHOR_SERVICE_URL = 'http://localhost:5000/author/'

class AuthorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loaded: false,
            author: {}
        };
    }


    handleClickOpen = () => {
        this.setState({ open: true }, this.loadAuthor());
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    loadAuthor = () => {
        fetch(AUTHOR_SERVICE_URL+this.props.ugr_id).then(response => {
            response.json().then(json => {
                if(json.success){
                    this.setState({ author: json.data, loaded: true })
                }
                else{
                    //TODO display error message
                }
            })
        })
    }
    render() {

        return (
            <div>
                <Button onClick={this.handleClickOpen}>{this.props.name}</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="md"
                    fullWidth={true}
                >
                    <DialogTitle id="responsive-dialog-title">{this.props.name}</DialogTitle>

                    {this.state.loaded &&
                        <DialogContent>
                            <DialogContentText component="div">

                                <h3>General info</h3>

                                <ul>
                                    <li><b>Nick name:</b> {this.state.author.nick_name}</li>
                                    <li><b>Speciality:</b> {this.state.author.speciality}</li>
                                    <li><b>Investigation group:</b> {this.state.author.investigation_group}</li>

                                </ul>

                                <h3>Bibliographic info</h3>
                                <ul>
                                    <li>
                                        <b>UGR information:</b>
                                        <table className="sk-table-striped" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Cites</th>
                                                    <th>Total H-Index</th>
                                                    <th>Last 5 years Cites</th>
                                                    <th>Last 5 years H-Index</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.author.ugr_cites}</td>
                                                    <td>{this.state.author.ugr_hindex}</td>
                                                    <td>{this.state.author.ugr_cites5}</td>
                                                    <td>{this.state.author.ugr_hindex5}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                    <li>
                                        <b>Scopus information:</b>
                                        <table className="sk-table-striped" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Number of documents</th>
                                                    <th>Cites</th>
                                                    <th>H-Index</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.author.num_docs}</td>
                                                    <td>{this.state.author.scopus_cites}</td>
                                                    <td>{this.state.author.scopus_hindex}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>


                                <h3>Links</h3>
                                <div className="buttonGroup">
                                    <Button classes={{ root: "button" }} variant="outlined" href={this.state.author.ugr_url} target="_blank">
                                        UGR profile
                                        <Icon className={"fa fa-university icon"} />
                                    </Button>
                                    <Button classes={{ root: "button" }} variant="outlined" href={this.state.author.gscholar_url} target="_blank">
                                        Google Scholar profile
                                        <Icon className={"fab fa-google icon"} />
                                    </Button>
                                    {this.state.author.scopus_url.map((url, index) => {
                                        let profileNumber;
                                        if (this.state.author.scopus_url.length > 1)
                                            profileNumber = index + 1
                                        else
                                            profileNumber = ""
                                        return <Button key={`scopus_${profileNumber}`} classes={{ root: "button" }} variant="outlined" href={url} target="_blank">
                                            Scopus profile {profileNumber}
                                        </Button>
                                    })}
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    }
                    {!this.state.loaded &&
                        <DialogContent classes={{ "root": "perfect_centering" }}>
                            <CircularProgress color="secondary" />
                        </DialogContent>}


                    <DialogActions>

                        <Button onClick={this.handleClose} color="secondary" autoFocus>
                            Close
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AuthorView.propTypes = {
    name: PropTypes.string.isRequired,
    ugr_id: PropTypes.string.isRequired,

};

export default AuthorView;