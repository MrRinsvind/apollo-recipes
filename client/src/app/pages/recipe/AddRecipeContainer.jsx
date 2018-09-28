import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'
import { Mutation } from 'react-apollo'

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from 'queries'
import withAuth from 'hoc/withAuth'
import AddRecipe from './AddRecipe'


const initialState = {
  name: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: '',
  imageUrl: '',
  image:'',
}

class AddRecipeContainer extends Component {
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
  fileChangedHandler = (event) => {
    const image = event.target.files[0]
    this.setState({ image })
  }
  handleSubmit = (event, addRecipe) => {
    console.log('state',this.state)
    event.preventDefault()
    addRecipe({ variables:{ ...this.state }}).then(({ data }) => {
      this.setState({...initialState})
      this.props.history.push('/')
    })
  }
  render(){
    console.log('validateForm',this.validateForm())
    return(
      <Mutation
        mutation={ADD_RECIPE}
        // variables={{ ...this.state }}
        update={this.updateCache}
        refetchQueries={()=>[
          {
            query: GET_USER_RECIPES,
            variables: { username: this.state.username }
          },
        ]}
      >
        { ( addRecipe, { data, loading, error } ) => {
          console.log('error',error)

          return(
            <AddRecipe
              {...this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleEditorChange={this.handleEditorChange}
              fileChangedHandler={this.fileChangedHandler}
              validateForm={this.validateForm}
              addRecipe={addRecipe}
              loading={loading}
              error={error}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipeContainer))
