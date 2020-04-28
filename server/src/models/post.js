const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  categories: {
    items: [
      {
      categoryTitle: { 
        type: String, 
        required: false 
      }
    }]
  }
})


const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel