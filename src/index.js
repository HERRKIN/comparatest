import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';

import client from './client'
import App from './App';
import './index.css';
// import './flexbox.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BrowserRouter as Router, Route} from 'react-router-dom'
injectTapEventPlugin();

ReactDOM.render(
  <ApolloProvider  client={client}>
    <MuiThemeProvider>
      <Router>
        <Route path='/' component={App} />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
