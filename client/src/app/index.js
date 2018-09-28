import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createUploadLink } from 'apollo-upload-client'
import Router from 'routes/Router'
import './index.css';

// const link = createUploadLink({ uri: 'http://localhost:5555/graphql' })
// console.log('link',link)
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


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
  , document.getElementById('root'));


module.hot.accept();
