const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')


module.exports = function(app){
  const corsOptions = {
    origin: process.env.FRONT_CORS,
    credentials: true,
  }
  app.use(cors(corsOptions))
  app.use(express.static('public'))
//Serves all the request which includes /images in the url from Images folder
  app.use('/public/images', express.static(__dirname + '/public/images'))
// Set up JWT authentication middleware
  app.use(async (req, res, next) => {
    const token = req.headers['authorization']
    if(token !== 'null'){
      try{
        const currentUser = await jwt.verify(token,  process.env.SECRET_FOR_TOKEN)
        req.currentUser = currentUser
      }
      catch(err){
        req.currentUser = undefined
      }
    }
    next()
  })
}

