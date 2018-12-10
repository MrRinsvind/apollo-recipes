const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  scalar Upload

  type Recipe {
    _id: ID
    name: String!
    imageUrl: Upload!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }


  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

   type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

 

  type Query{
    uploads: [File]
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    getCurrentUser: User
    searchRecipes(searchTerm: String): [Recipe]
    getUserRecipes(username: String!): [Recipe]
  }

  type Token {
    token: String!
  }

  input RecipeInput {
    name: String!
    description: String!
    category: String!
    instructions: String!
    imageUrl: Upload!
    username: String
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input SigninInput {
    username: String!
    password: String!
  }

  type Mutation {
    addRecipe(input: RecipeInput): Recipe
    deleteUserRecipe(_id: ID): Recipe
    likeRecipe(_id: ID!, username: String!): Recipe
    unlikeRecipe(_id: ID!, username: String!): Recipe
    signinUser(input: SigninInput): Token
    signupUser(input: SignupInput): Token
    singleUpload(file: Upload!): File!
  }
`