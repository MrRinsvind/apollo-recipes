import { gql } from 'apollo-boost'

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`

export const GET_RECIPE = gql`
  query($_id:ID!){
    getRecipe(_id: $_id){
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`
export const SEARCH_RECIPES = gql`
  query($searchTerm: String){
    searchRecipes(searchTerm: $searchTerm){
      _id
      name
      likes
    }
  }
`
export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!){
    deleteUserRecipe(_id: $_id){
      _id
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!){
    likeRecipe(_id: $_id, username: $username){
      _id
      likes
    }
  }
`
export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!){
    unlikeRecipe(_id: $_id, username: $username){
      _id
      likes
    }
  }
`

export const ADD_RECIPE = gql`
  mutation($name:String!, $category:String!, $description:String!, $instructions: String!, $username: String ) {
    addRecipe(input:{
      name:$name
      category:$category
      description:$description
      instructions:$instructions
      username:$username
    }){
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`
// User Queries

export const GET_CURRENT_USER = gql`
  query{
    getCurrentUser{
      username
      joinDate
      email
      favorites{
        _id
        name
      }
    }
  }
`

// User Mutations

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(input:{
      username: $username
      password: $password
    }){
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(input:{
      username: $username
      email: $email
      password: $password
    }){
      token
    }
  }
`

export const GET_USER_RECIPES = gql`
  query($username: String!){
    getUserRecipes(username: $username){
      _id
      name
      likes
    }
  }
`

