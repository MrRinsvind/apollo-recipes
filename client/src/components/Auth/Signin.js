import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Error from '../Error'
import { SIGNIN_USER } from '../../queries'

const initialState = {
  username: "",
  password: "",
}

class Signin extends Component{

  state = { ...initialState }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = (event, signinUser) => {
    event.preventDefault()

    signinUser().then(({ data }) => {
      localStorage.setItem('token', data.signinUser.token)
      this.setState({ ...initialState })
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
            return(
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                <input onChange={this.handleChange} value={username} type="text" name="username" placeholder="Username" />
                <input onChange={this.handleChange} value={password} type="password" name="password" placeholder="Password" />
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

export default Signin