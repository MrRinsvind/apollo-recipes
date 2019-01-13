const mongoose = require('mongoose')

module.exports = function(){
  mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(()=>console.log('DB connected'))
    .catch(err => console.error(err))
}
