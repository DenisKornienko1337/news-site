const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  articles: {
    items: [
      {       
        articleId: {type : mongoose.Schema.ObjectId, ref : 'Post'}
      }
    ],
  },
  userId: {
    type : mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

categorySchema.methods.addPost = function(post) {  
  this.articles.items.push({'articleId': post._id})
  return this.save()  
}

categorySchema.methods.removePost = function(postId) { 
  const filteredItems = this.articles.items.filter( postItem => {    
    return postItem.articleId.toString() !== postId.toString()
  })
  this.articles.items = filteredItems
  
  return this.save()  
}

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel