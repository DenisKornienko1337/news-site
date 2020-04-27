const Post = require('../models/post')

exports.getIndex = (req, res) => {
    Post.find({}, 'title description', (err, posts) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.send({ posts: posts })
        }
      }
    ).sort({ _id: -1 })
}

exports.getPost = (req, res) => {
    const prodId = req.params.productId;
    Post.findById(prodId, 'title description', (err, posts) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.send({ posts: posts })
        }
      }
    ).sort({ _id: -1 })
}

exports.postAddPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
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
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
  
    const post = new Post(
      updatedTitle,
      updatedDesc,
      prodId
    );
    post
      .save()
      .then(result => {
        console.log('UPDATED PRODUCT!');
      })
      .catch(err => console.log(err));
}

exports.postDestroy = (req, res, next) => {
    console.log('Delete');
    console.log('id', req.body.id);
    
    const id = req.body.id;
    Post.deleteOne({_id: id}).catch(err => console.log(err));
}