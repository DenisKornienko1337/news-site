const Post = require('../models/post')
const Category = require('../models/category')
const User = require('../models/user')
const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.getIndex = (req, res) => {
    Post.find({}, 'title description date imageId')    
      .populate('categories.items.categoryId')
      .populate('userId')
      .sort({ _id: -1 })
      .then(posts => {
        res.send({ posts: posts })
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
}

exports.getUserIndex = (req, res) => {
  User.findById(req.session.user)
  .then(user => {
    if(user.permission == 'superuser'){
      Post.find()
      .populate('categories.items.categoryId')
      .then(posts => res.send({posts: posts}))
      .catch(err => res.sendStatus(500))
    } else {
      Post.find({'userId': req.session.user})
      .populate('categories.items.categoryId')
      .then(posts => res.send({posts: posts}))
      .catch(err => res.sendStatus(500))
    }
  })
  .catch(err => {
    res.sendStatus(500)
  })
}

exports.getPost = (req, res) => {
    const postId = req.body.id;
    Post.findById(postId, 'title description')
      .populate('categories.items.categoryId')
      .then(posts => res.send({ posts: posts }))
      .then(() => res.sendStatus(200))
      .catch(err => res.sendStatus(500))
}

exports.postAddPost = (req, res) => {
  User.find({})
  .then((users) => {
    users.map(user => {
        if(String(user._id)==String(req.session.user)) {
          const imagePath = path.resolve(__dirname, '..').replace(/\\/g, '/')+'/public/'
          let base64Image = req.body.image.replace(/^data:image\/[a-z]+;base64,/, "")
          let binaryImage = new Buffer(base64Image, 'base64')
          let imageId = uuidv4().toString()
          let imageFile = imageId+'.jpg'
          let fullImagePath = imagePath+imageFile
          fs.writeFileSync(fullImagePath, binaryImage)
          let date  = new Date()
          let formattedDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
          const post = new Post({
            title: req.body.title,
            description: req.body.description,
            userId: user._id,
            date: formattedDate,
            imageId: fullImagePath,
          })
          post.save()
          .then(result => {
            Category.find({'_id': req.body.categories})
              .then(cat => {
                post.addCategories(req.body.categories)      
                cat.map(c => {
                  c.addPost(post)
                })
              })
            res.sendStatus(200)
          })
          .then(() => {
            User.findById(req.session.user)
            .then(user => {
              user.addPost(post)
            })
          })
          .catch(err => console.log(err))
        }
    })
  })
}

exports.postUpdatePost = (req, res, next) => {
    const postId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;        
    const updatedCategoriesIds = req.body.categories;
        
    Post.findById(postId)
      .then( post => {        
        post.title = updatedTitle;
        post.description = updatedDesc;
        
        Category.find({'articles.items.articleId':postId})
          .then(cats => {
             cats.map(c => c.removePost(postId))
             return cats
          })
          .catch(err => console.log(err))

        return post.save()
      })
      .then(post => { 
        Category.find({'_id': updatedCategoriesIds})
        .then(cat => {    
          cat.map(c => {
            c.addPost(post)
          })
        })
        
        return post.updateCategories(updatedCategoriesIds)
      })
      .then(result => {
        res.sendStatus(200)
      })
      .catch(err => console.log(err))
}

exports.postDestroy = (req, res, next) => {    
    const postId = req.body.id;
    Category.find({'articles.items.articleId': req.body.id})
      .then(cats => {
        cats.map( c => c.removePost(postId))
        return cats;
      })
      .catch(err => console.log(err))

    Post.deleteOne({_id: postId})
    .then(result => {
      res.sendStatus(200)
    })
    .then(() => {
      User.findById(req.session.user)
      .then(user => {
        user.removePost(postId)
      })
    })
    .catch(err => res.sendStatus(500));
}