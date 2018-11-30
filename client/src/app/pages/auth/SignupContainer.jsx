import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import SignupForm from './SignupForm'
import { SIGNUP_USER } from 'queries'

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
}

class SignupContainer extends Component{

  state = { ...initialState }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = (event, signupUser) => {
    event.preventDefault()

    signupUser().then( async({ data }) => {
      localStorage.setItem('token', data.signupUser.token)
      await this.props.refetch()
      this.setState({ ...initialState })
      this.props.history.push('/')
    }) 
  }

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state
    return !username || !email || !password || password !== passwordConfirmation 
  }
  render(){
    const { username, email, password, passwordConfirmation } = this.state
    return(
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {( signupUser, { data, loading, error })=>{
            return(
              <SignupForm  
                signupUser={signupUser}
                data={data}
                loading={error}
                passwordConfirmation={passwordConfirmation}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                { ...this.state}
              />
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SignupContainer)