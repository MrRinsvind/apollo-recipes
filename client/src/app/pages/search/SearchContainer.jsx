import { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import Search from './Search'


class SearchContainer extends Component{
  state={
    searchResult: []
  }
  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResult: searchRecipes
    })
  }
  render(){
    const { searchResult } = this.state
    return(
      <ApolloConsumer>
        { client => (
            <Search
              searchResult={searchResult}
              handleChange={this.handleChange}
              client={client}
            />
        )}
      </ApolloConsumer>
    )
  }
}


export default SearchContainer