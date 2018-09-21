const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-express')

const Recipe = require('./models/Recipe')
const User = require('./models/User')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose
  .connect('mongodb://rinsvind:7247385uu@ds125472.mlab.com:25472/rinsvind-react-recipes', { useNewUrlParser: true })
  .then(()=>console.log('DB connected'))
  .catch(err => console.error(err))

const app = express(); 

const corsOptions = {
  origin: 'http://localhost:3333',
  credentials: true,
}
app.use(cors(corsOptions))

// Set up JWT authentication middleware
// app.use(async (req, res, next) => {
//   const token = req.headers['authorization']
//   if(token !== 'null'){
//     try{
//       const currentUser = await jwt.verify(token, 'dsgsdgsdgr45t4tg4s4wgs')
//       req.currentUser = currentUser
//     }
//     catch(err){
//       console.log(err)
//     }
//   }
//   next()
// })



const server = new ApolloServer({
  schema,
  context: ({req, res}) => ({
    Recipe,
    User,
    currentUser: req.currentUser,
  })
})

server.applyMiddleware({ app })

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4444
app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})

