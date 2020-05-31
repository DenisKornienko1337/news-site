const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  categories: {
    items: [
      {
        categoryId: {type : mongoose.Schema.ObjectId, ref : 'Category'}
      }
    ],
  },
  posts: {
    items: [
      {
        postId: {type : mongoose.Schema.ObjectId, ref : 'Post'}
      }
    ],
  },
  image: {
    type: String,
  }
})

userSchema.methods.addPost = function(post) {  
  this.posts.items.push({'postId': post._id})
  return this.save()  
}

userSchema.methods.removePost = function(postId) {
  const filteredPosts = this.posts.items.filter(post => {
    return post.postId.toString() != postId.toString()
  })
  this.posts.items = filteredPosts
  return this.save()
}

userSchema.methods.removeCategory = function(categoryId) {
  this.categories.items= this.categories.items.filter(cat => {
    return cat.categoryId.toString() != categoryId.toString()
  })
  return this.save()
}

userSchema.methods.addCategory = function(category) {  
  this.categories.items.push({'categoryId': category._id})
  return this.save()  
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel