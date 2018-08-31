import React from 'react'

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
  render(){
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
          </select> d
          <input type="text" name="description" placeholder="Add description" onChange={this.handleChange} value={this.state.description}/>
          <textarea name="instructions" placeholder="Add instructions" onChange={this.handleChange} value={this.state.instructions}></textarea>
          <button type="submit" className="button-primary">Submit</button> 
        </form>
      </div>
    )
  }
}

export default AddRecipe