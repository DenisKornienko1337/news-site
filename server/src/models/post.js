const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  categories: {
    items: [{
      category: { type: Object, required: true }
    }]
  }
})
const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel