const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}


exports.resolvers = {
  Query: {
    getAllRecipes: async (root, { input }, { Recipe })=>{
      const allRecipes = await Recipe.find()
      return allRecipes
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