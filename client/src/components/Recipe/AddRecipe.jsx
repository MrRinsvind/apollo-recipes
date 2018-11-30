import React from 'react'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'
import CKEditor from 'react-ckeditor-component'

import { Mutation } from 'react-apollo'
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries'
import Error from '../../common/widgets/Error'
import withAuth from '../withAuth'

const initialState = {
  name: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: '',
  imageUrl: '',
}

class AddRecipe extends React.Component {
  state={...initialState}
  componentDidMount(){
    if(!get(this.props, 'session.getCurrentUser.username')){
      return this.props.history.push('/')
    }
    this.setState({
      username: this.props.session.getCurrentUser.username
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleEditorChange = event =>  {
    const newContent = event.editor.getData()
    this.setState({ instructions: newContent })
  }

  validateForm = () => {
    const { name, category, instructions,  description, imageUrl } = this.state
    return !name || !category || !instructions || !description || !imageUrl
  }
  updateCache = (cache, { data: { addRecipe }}) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES }) 

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    })
  }
  handleSubmit = (event, addRecipe) => {
    event.preventDefault()
    addRecipe().then(({ data }) => {
      this.setState({...initialState})
      this.props.history.push('/')
    })
  }
  render(){
    return(
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ ...this.state }}
        update={this.updateCache}
        refetchQueries={()=>[
          { 
            query: GET_USER_RECIPES, 
            variables: { username: this.state.username } 
          },
        ]}
      >
        { ( addRecipe, { data, loading, error } ) => {
          return(
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form onSubmit={(event) => this.handleSubmit(event, addRecipe)} className="form">
                <input type="text" value={this.state.name} name="name" placeholder="Recipe Name" onChange={this.handleChange}/>
                <input type="text" value={this.state.imageUrl} name="imageUrl" placeholder="Recipe Image" onChange={this.handleChange}/>
                <select name="category" onChange={this.handleChange} value={this.state.category}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} value={this.state.description}/>


                <label htmlFor="instructions">Add instructions</label>
                <CKEditor
                  name="instructions"
                  content={this.state.instructions}
                  events={{ change: this.handleEditorChange }}
                />
                <button onClick={(event) => this.handleSubmit(event, addRecipe)} disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                { error && <Error error={error}/> }
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe))