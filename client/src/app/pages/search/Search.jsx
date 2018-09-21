import { SEARCH_RECIPES } from 'queries'
import { SearchItem } from 'common/widgets'


export default ({ searchResult, handleChange, client }) => {
  return (
  <div className="App">
    <input type="search" className="search" placeholder="Search for Recipes" onChange={async (event)=>{
      event.persist()
      const { data } = await client.query({
        query: SEARCH_RECIPES,
        variables: { searchTerm: event.target.value }
      })
      handleChange(data)
    }}/>
    <ul>
      {searchResult && searchResult.map(recipe => (
        <SearchItem {...recipe} key={recipe._id}/> 
      ))}
    </ul>
  </div>
)}