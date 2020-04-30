const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  articles: {
    items: [
      {       
        articleId: {type : mongoose.Schema.ObjectId, ref : 'Post'}
      }
    ]
  }
})

categorySchema.methods.addPost = function(post) {  
  this.articles.items.push({'articleId': post._id})

  return this.save()  
}

categorySchema.methods.removePost = function(post) { 
  const filteredItems = this.articles.items.filter( postItem => {    
    return postItem.articleId.toString() !== post._id.toString()
  })
  this.articles.items = filteredItems
  
  return this.save()  
}
const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel