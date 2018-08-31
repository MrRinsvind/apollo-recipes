import React from 'react'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

import { Mutation } from 'react-apollo'
import { ADD_RECIPE } from '../../queries'
import Error from '../Error'

const initialState = {
  name: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: ''
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
  validateForm = () => {
    const { name, category, instructions,  description } = this.state
    return !name || !category || !instructions || !description
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
      <Mutation mutation={ADD_RECIPE} variables={{ ...this.state }}>
        { ( addRecipe, { data, loading, error } ) => {
          return(
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form onSubmit={(event) => this.handleSubmit(event, addRecipe)} className="form">
                <input type="text" value={this.state.name} name="name" placeholder="Recipe Name" onChange={this.handleChange}/>
                <select name="category" onChange={this.handleChange} value={this.state.category}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} value={this.state.description}/>
                <textarea name="instructions" placeholder="Add instructions" onChange={this.handleChange} value={this.state.instructions}></textarea>
                <button onClick={(event) => this.handleSubmit(event, addRecipe)} disabled={loading || this.validateForm} type="submit" className="button-primary">Submit</button> 
                {error && <Error error={error}/>}
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(AddRecipe)