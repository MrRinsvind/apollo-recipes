import React from 'react'

import { Mutation } from 'react-apollo'
import { ADD_RECIPE } from '../../queries'
import Error from '../Error'
class AddRecipe extends React.Component {
  state={
    name: '',
    instructions: '',
    category: 'Breakfast',
    description: '',
    username: ''
  }
  componentDidMount(){
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
    const { name, category, instructions, username, description } = this.state
  }
  render(){
    <Mutation mutation={ADD_RECIPE} variables={{ ...this.state }}>
      { ( addRecipe, { data, loading, error } ) => {
        return(
          <div className="App">
            <h2 className="App">Add Recipe</h2>
            <form action="" className="form">
              <input type="text" value={this.state.name} name="name" placeholder="Recipe Name" onChange={this.handleChange}/>
              <select name="category" onChange={this.handleChange} value={this.state.category}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
              <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} value={this.state.description}/>
              <textarea name="instructions" placeholder="Add instructions" onChange={this.handleChange} value={this.state.instructions}></textarea>
              <button disabled={loading || this.validateForm} type="submit" className="button-primary">Submit</button> 
              {error && <Error error={error}/>}
            </form>
          </div>
        )
      }}
    </Mutation>
  }
}

export default AddRecipe