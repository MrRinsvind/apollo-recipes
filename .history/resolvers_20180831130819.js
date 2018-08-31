const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}


exports.resolvers = {
  Query: {
    getAllRecipes: async (root, { input }, { Recipe })=>{
      const allRecipes = await Recipe.find().sort({})
      return allRecipes
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id })
      return recipe
    },
    getCurrentUser: async(root, args, { currentUser, User })=>{
      if(!currentUser){
        return null
      }
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Recipe'
        })
      
      return user
    }
  },
  Mutation: {
    addRecipe: async (root, { input }, { Recipe }) => {
      const newRecipe = await new Recipe({
        name: input.name,
        description: input. description,
        category: input.category,
        instructions: input.instructions,
        username: input.username,
      }).save()
      return newRecipe
    },
    signinUser: async(root, { input }, { User }) => {
      const user = await User.findOne({ username: input.username })
      if(!user){
        throw new Error('Usernot found')
      }
      const isValidPassword = await bcrypt.compare(input.password, user.password)

      if(!isValidPassword){
        throw new Error('Invalid password')
      }
      return { token: createToken(user, process.env.SECRET, '1hr') }
    },
    signupUser: async(root, { input }, { User }) => {
      const user = await User.findOne({ username: input.username })
      if(user){
        throw new Error('User already exists')
      }

      const newUser = await new User({
        username: input.username,
        email: input.email,
        password: input.password,
      }).save()
      return { token: createToken(newUser, process.env.SECRET, '1hr') }
    }
  }
}