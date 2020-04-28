const Post = require('../models/post')

exports.getIndex = (req, res) => {
    Post.find({}, 'title description categories.items.categoryTitle')
      .sort({ _id: -1 })
      .then(posts => res.send({ posts: posts }))
      .catch(err => res.sendStatus(500))
}

exports.getPost = (req, res) => {
    const prodId = req.params.productId;
    Post.findById(prodId, 'title description categories.items.categoryTitle')   
      .sort({ _id: -1 })
      .then(posts => res.send({ posts: posts }))
      .catch(err => res.sendStatus(500))
}

exports.postAddPost = (req, res) => {
    const categoriesTitles = req.body.categories.map( cat => {
      return {categoryTitle: cat.title}
    })

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        categories: {
          items: categoriesTitles
        } 
    })
    
    post.save()
      .then(result => { 
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
    const id = req.body.id;
    Post.deleteOne({_id: id}).catch(err => console.log(err));
}