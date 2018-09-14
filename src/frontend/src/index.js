import './index.css';
import App from './App';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2a4466' },
    },
});


ReactDOM.render((
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
), document.getElementById('root'))