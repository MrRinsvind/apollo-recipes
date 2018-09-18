import React from 'react'
import Error from '../../common/widgets/Error'

export default ({ handleSubmit, signinUser, handleChange, username, password, loading, error, validateForm }) => {
  return(
    <form className="form" onSubmit={event => handleSubmit(event, signinUser)}>
      <input onChange={handleChange} value={username} type="text" name="username" placeholder="Username" />
      <input onChange={handleChange} value={password} type="password" name="password" placeholder="Password" />
      <button disabled={loading || validateForm()} type="submit" className="button-primary">Submit</button>
      {error && <Error error={error}/>}
    </form>
  )
}