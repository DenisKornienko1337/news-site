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
        categoryId: {type : mongoose.Schema.ObjectId, ref : 'Category'}
      }
    ]
  },
})

postSchema.methods.addCategories = function(categories) {  
  console.log('categories', categories);
  
  categories.map(c => this.categories.items.push({'categoryId': c}))
  return this.save()  
}

postSchema.methods.updateCategories = function(categoriesIds) {    
  this.categories.items = []
  categoriesIds.map(c => {    
    return this.categories.items.push({'categoryId': c})
  })

  return this.save()  
}

postSchema.methods.removeCategory = function(categoryId) {  
  const filteredCategories = this.categories.items.filter( cat => {    
    return categoryId.toString() !== cat.categoryId.toString()
  })

  this.categories.items = filteredCategories;

  return this.save()  
}

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel