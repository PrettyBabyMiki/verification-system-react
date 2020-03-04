import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './redux/store'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'


const theme = createMuiTheme ({
    typography: {
        fontFamily: [
            'Oxanium'
        ].join(','),
        h1: {
            fontFamily: 'Oxanium',
            fontSize: 85,
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <App />
    </Provider>
    </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
