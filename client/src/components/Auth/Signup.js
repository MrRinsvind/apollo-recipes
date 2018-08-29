import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import Error from '../Error'
import { SIGNUP_USER } from '../../queries'

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
}

class Signup extends Component{

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
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                <input onChange={this.handleChange} value={username} type="text" name="username" placeholder="Username" />
                <input onChange={this.handleChange} value={email} type="text" name="email" placeholder="Email Adress" />
                <input onChange={this.handleChange} value={password} type="password" name="password" placeholder="Password" />
                <input onChange={this.handleChange} value={passwordConfirmation} type="password" name="passwordConfirmation" placeholder="Confirm Password" />
                <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                {error && <Error error={error}/>}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(Signup)