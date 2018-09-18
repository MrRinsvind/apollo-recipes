import Error from '../Error'

export default ({ handleSubmit, signinUser, handleChange, username, password, loading, error}) => {
  return(
    <form className="form" onSubmit={event => handleSubmit(event, signinUser)}>
      <input onChange={handleChange} value={username} type="text" name="username" placeholder="Username" />
      <input onChange={handleChange} value={password} type="password" name="password" placeholder="Password" />
      <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
      {error && <Error error={error}/>}
    </form>
  )
}