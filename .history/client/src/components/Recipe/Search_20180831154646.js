import React from 'react'

import { Query } from 'react-apollo'
import { SEARCH_RECIPES } from '../../queries'

const Search = () => (
  <Query query={SEARCH_RECIPES} variables={{ searchTerm: "" }}>
    {({ data, loading, error }) => {
      if(loading) return <div>loading</div>
      if(error) return <div>error</div>
      return(
        <div className="App">
          <input type="search"/>
          <ul>
            {data.searchRecipes.map(recipe => (
              <li key={recipe._id}></li>
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default Search