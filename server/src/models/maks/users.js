const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  photo_url: {
    type: String,
  },
  name: {
    type: String
  },
  age: {
    type: String
  },
  area: {
    type: String
  },
  position: {
    type: String
  },
  about: {
    type: String
  }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel