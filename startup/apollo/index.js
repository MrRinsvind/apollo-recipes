const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')

const Recipe = require('../../models/Recipe')
const User = require('../../models/User')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = function(app){
  const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({
      Recipe,
      User,
      currentUser: req.currentUser,
    })
  })

  server.applyMiddleware({ app })
}

