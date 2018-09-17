import React from 'react'
import posed from 'react-pose'

import './App.css'
import RecipeItem from './Recipe/RecipeItem'
import { Query } from 'react-apollo'
import { GET_ALL_RECIPES } from '../queries'
import Spinner from './Spinner'


const RecipeList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x:'-100%',
  },
})



class App extends React.Component{
  state = {
    on: false
  }

  componentDidMount(){
    setTimeout(this.slideIn, 200)
  }

  slideIn = () => {
    this.setState({ on:!this.state.on })
  }

  render(){
    const { on } = this.state
    return (
      <div className="App">
        <h1 className="main-title">Find recipes You <strong>Love</strong></h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error })=> {
            if(loading) return <Spinner/>
            if(error) return <div>Error</div>
            return(
              <RecipeList className="cards" pose={on ? 'shown' : 'hidden'}>
                {data.getAllRecipes.map(recipe =>
                  <RecipeItem {...recipe} key={recipe._id}/>
                )}
              </RecipeList>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default App;
