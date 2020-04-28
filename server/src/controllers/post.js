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
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
            success: true,
            message: `Post with ID_${data._id} saved successfully!`
            })
        }
    })
}

exports.postUpdatePost = (req, res, next) => {
    const postId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
  
    const categoriesTitles = req.body.categories.map( cat => {
      return {categoryTitle: cat.title}
    })

    Post.findById(postId)
      .then( post => {
        post.title = updatedTitle;
        post.description = updatedDesc;
        post.categories.items = categoriesTitles;

        return post.save();
      })
      .catch(err => console.log(err))
}

exports.postDestroy = (req, res, next) => {
    console.log('Delete');
    console.log('id', req.body.id);
    
    const id = req.body.id;
    Post.deleteOne({_id: id}).catch(err => console.log(err));
}