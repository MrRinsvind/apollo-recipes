import { Error } from 'common/widgets'


export default ({ handleChange, handleSubmit, signupUser, username, email, password, passwordConfirmation, validateForm, loading, error }) => {
  return(
    <form className="form" onSubmit={event => handleSubmit(event, signupUser)}>
      <input onChange={handleChange} value={username} type="text" name="username" placeholder="Username" />
      <input onChange={handleChange} value={email} type="text" name="email" placeholder="Email Adress" />
      <input onChange={handleChange} value={password} type="password" name="password" placeholder="Password" />
      <input onChange={handleChange} value={passwordConfirmation} type="password" name="passwordConfirmation" placeholder="Confirm Password" />
      <button disabled={loading || validateForm()} type="submit" className="button-primary">Submit</button>
      {error && <Error error={error}/>}
    </form>
  )
}