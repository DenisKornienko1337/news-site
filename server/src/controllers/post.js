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
    const prodId = req.params.productId;
    Post.findById(prodId, 'title description')
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
        
    const categoriesTitles = req.body.categories.map( cat => {
      return {
        categoryTitle: cat.title
      }
    })
    
    Post.findById(postId)
      .then( post => {        
        post.title = updatedTitle;
        post.description = updatedDesc;
        post.categories.items = categoriesTitles;

        return post.save()
      })
      .then(result => {
        res.sendStatus(200)
      })
      .catch(err => console.log(err))
}

exports.postDestroy = (req, res, next) => {    
    const postId = req.body.id;
    // Post.findById(postId)
    //   .then(post => {
    //     const catsIds = post.categories.items.map(cat => cat.categoryId)
    //     Category.find({'_id': {$in: catsIds} })
    //     .then(cats => {
    //       cats.map( c => {
    //         console.log(post, 'post');
            
    //         c.removePost(post)
    //       })
    //       return cats;
    //     })
    //     .catch(err => console.log(err))
    //   })

    Post.deleteOne({_id: postId}).catch(err => console.log(err));
}