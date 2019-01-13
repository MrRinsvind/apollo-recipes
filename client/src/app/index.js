import ReactDOM from 'react-dom'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import Router from 'routes/Router'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './index.css'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(createUploadLink({ uri: process.env.API_URI })),
  // uri: 'https://mr-rinsvind-recipes.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  cache: new InMemoryCache(),

  onError: ({ networkError }) => {
    if(networkError){
      localStorage.setItem('token', '')
    }
  }
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
  , document.getElementById('root'));


module.hot.accept();