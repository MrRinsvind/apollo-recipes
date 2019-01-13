const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

require('./startup/db')()
require('./startup/middle.js')(app)
require('./startup/apollo/')(app)

if(process.env.NODE_ENV === 'production' || true){
  app.use(express.static('client/build'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(process.env.SERVER_PORT, ()=>{
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
})

