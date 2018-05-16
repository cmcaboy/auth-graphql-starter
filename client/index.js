import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';

const networkInterface = createNetworkInterface({
  // When you create a new network interface, graphql
  // no longer assumes /graphql is the default interface
  uri: '/graphql',
  opts: {
    // Tell Apollo to send cookies when it makes
    // a request to the backend server
    credentials: 'same-origin'
  }
});

// We have to do this to avoid a bug.
// As a result, we need to include an id with
// all of our graphql objects.
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});



const Root = () => {
  return (
    <ApolloProvider client={client}>  
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="login" component={LoginForm} />
            <Route path="signup" component={App} />
          </Route>
        </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
