exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String!
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


  type Query{
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
    signinUser(input: SigninInput): Token
    signupUser(input: SignupInput): Token
  }
`