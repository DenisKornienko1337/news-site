const Post = require('../models/post')
const Category = require('../models/category')

exports.getIndex = (req, res) => {
    Post.find({}, 'title description')    
      .populate('categories.items.categoryId')
      .sort({ _id: -1 })
      .then(posts => res.send({ posts: posts }))
      .catch(err => res.sendStatus(500))
}

exports.getPost = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId, 'title description')
      .populate('categories.items.categoryId')
      .sort({ _id: -1 })
      .then(posts => res.send({ posts: posts }))
      .catch(err => res.sendStatus(500))
}

exports.postAddPost = (req, res) => { 
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
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
      .catch(err => console.log(err))
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

    Post.deleteOne({_id: postId}).catch(err => console.log(err));
}