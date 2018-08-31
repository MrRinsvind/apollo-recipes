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