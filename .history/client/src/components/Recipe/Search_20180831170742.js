import React from 'react'
import { Link } from 'react-router-dom'

import { ApolloConsumer } from 'react-apollo'
import { SEARCH_RECIPES } from '../../queries'


class Search extends React.Component{
  handleChange = data => {
    console.log(data)
  }
  render(){
    return(
      <ApolloConsumer>
        { client => (
            <div className="App">
              <input type="search" placeholder="Search for Recipes" onChange={async (event)=>{
                event.persist()
                const {data} = await client.query({
                   query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                })
                this.handleChange(data)
              }}/>
              <ul>
                {/* {data.searchRecipes.map(recipe => (
                  <li key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name}</h4></Link>
                    <p>{recipe.likes}</p>
                  </li>
                ))} */}
              </ul>
            </div>
        )}
      </ApolloConsumer>
    )
  }
}


export default Search