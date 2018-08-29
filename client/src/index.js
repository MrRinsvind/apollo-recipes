import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import widthSession from './components/withSession'


import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },

  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },

  onError: ({ networkError }) => {
    if(networkError){
      console.log('Network Error', networkError)
    }
  }
})

const Root = ({ refetch }) => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" render={()=> <Signin refetch={refetch} />} />
      <Route path="/signup" render={()=> <Signup refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </Router>
)

const RootWithSession = widthSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
  , document.getElementById('root'));
