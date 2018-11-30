import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { SIGNIN_USER } from 'queries'
import SigninForm from './SigninForm'

const initialState = {
  username: "",
  password: "",
}

class SigninContainer extends Component{
  state = { ...initialState }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = (event, signinUser) => {
    event.preventDefault()

    signinUser().then( async({ data }) => {
      localStorage.setItem('token', data.signinUser.token)
      await this.props.refetch()
      this.setState({ ...initialState })
      this.props.history.push('/')
    })
  }
  validateForm = () => {
    const { username, password } = this.state
    return !username || !password
  }
  render(){
    const { username, password } = this.state
    return(
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {( signinUser, { data, loading, error })=>{
            return <SigninForm
              data={data}
              loading={loading}
              error={error}
              signinUser={signinUser}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              validateForm={this.validateForm}
            />
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SigninContainer)