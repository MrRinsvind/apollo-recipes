import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from 'components/App';
import Signin from 'components/Auth/Signin';
import Signup from './components/Auth/Signup';
import widthSession from './components/withSession'
import NavBar from './components/NavBar'
import Search from './components/Recipe/Search'
import AddRecipe from './components/Recipe/AddRecipe'
import Profile from './components/Profile/Profile'
import RecipePage from './components/Recipe/RecipePage'
import SigninContainer from 'pages/auth/SigninContainer'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  // uri: 'https://mr-rinsvind-recipes.herokuapp.com/graphql',
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
      localStorage.setItem('token', '')
    }
  }
})

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <NavBar session={session}/>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" exact component={Search} />
        <Route path="/signin" render={()=> <SigninContainer refetch={refetch} />} />
        <Route path="/signup" render={()=> <Signup refetch={refetch} />} />
        <Route path="/recipe/add"  render={() => <AddRecipe session={session}/> } />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile"  render={() => <Profile session={session}/>} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
)

const RootWithSession = widthSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
  , document.getElementById('root'));


module.hot.accept();