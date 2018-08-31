import React from 'react'

import { Query } from 'react-apollo'

const Search = () => (
  <Query query={SEARCH_RECIPES}>
    {() => {
      return(
        <div className="App">
          <input type="search"/>
        </div>
      )
    }}
  </Query>
)

export default Search