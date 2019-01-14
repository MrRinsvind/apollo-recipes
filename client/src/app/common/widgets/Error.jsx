export default Error = ({ error }) => {
  let errorText = error.message
  if(errorText === "GraphQL error: Cannot read property 'pipe' of undefined"){
    errorText = "Image is required for api"
  }
  return  <p>{errorText}</p>
}
