exports.resolvers = {
  Query: {
    getAllRecipes: ()=>{}
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
    }
  }
}