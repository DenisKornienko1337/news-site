const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  permission: {
    type: String,
  },
  categories: {
    items: [
      {
        categoryId: {type : mongoose.Schema.ObjectId, ref : 'Category'}
      }
    ]
  },
  posts: {
    items: [
      {
        postId: {type : mongoose.Schema.ObjectId, ref : 'Post'}
      }
    ]
  }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel