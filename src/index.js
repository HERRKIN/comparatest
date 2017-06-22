import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client'
import App from './App';
import './index.css';
// import './flexbox.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
