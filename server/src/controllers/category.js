const Category = require('../models/category')
const Post = require('../models/post')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10

exports.getIndex = (req, res) => {
    Category.find({}, 'title')
        .populate('articles.items.articleId')
        .sort({ _id: -1 })
        .then( categories => res.send({ categories: categories }))
        .catch( err => res.sendStatus(500))
}

exports.getCategory = (req, res, next) => {
  const catId = req.body.id;
      Category.findById(catId)
      .populate('articles.items.articleId')
      .then( category => res.send({ category: category }))
      .catch( err => res.sendStatus(500))
}

exports.postAddCategory = (req, res) => {
  User.find({})
  .then((users) => {
    users.map(user => {
      bcrypt.compare(String(user._id), req.session.user, function(err, result){
        if(result){
          const category = new Category({
            title: req.body.title,
            user: user._id
        })
        category.save()
          .then(result => { 
            res.sendStatus(200)
          })
          .catch(err => console.log(err))
        }
      })
    })
  })
}

exports.postUpdateCategory = (req, res, next) => {
    const catId = req.body.id;
    const updatedTitle = req.body.title;
      
    Category.findById(catId)
      .then( category => {        
        category.title = updatedTitle;
        return category.save()
      })
      .then(result => {
        res.sendStatus(200)
      })
      .catch(err => console.log(err))
}

exports.postDestroy = (req, res, next) => {    
    const catId = req.body.id;
    Post.find({'categories.items.categoryId': req.body.id})
      .then(posts => {
        posts.map(p => p.removeCategory(catId))
        return posts
      })
      .catch(err => console.log(err))
      
    Category.deleteOne({_id: catId})
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
}