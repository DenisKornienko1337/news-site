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
    items: [{
      categoryId: {type : mongoose.Schema.ObjectId, ref : 'Category'}
    }]
  }
})

postSchema.methods.addCategories = function(categories) {  
  categories.map(c => this.categories.items.push({'categoryId': c._id}))
  return this.save()  
}

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel