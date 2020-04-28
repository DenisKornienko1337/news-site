const Category = require('../models/category')

exports.getIndex = (req, res) => {
    Category.find({}, 'title')
        .sort({ _id: -1 })
        .then( categories => res.send({ categories: categories }))
        .catch( err => res.sendStatus(500))
}

exports.postAddCategory = (req, res) => {
    const category = new Category({
        title: req.body.title,
    })
    category.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
            success: true,
            message: `Category with ID_${data._id} saved successfully!`
            })
        }
    })
}

// exports.postUpdatePost = (req, res, next) => {
//     const prodId = req.body.id;
//     const updatedTitle = req.body.title;
//     const updatedDesc = req.body.description;
  
//     const post = new Post(
//       updatedTitle,
//       updatedDesc,
//       prodId
//     );
//     post
//       .save()
//       .then(result => {
//         console.log('UPDATED PRODUCT!');
//       })
//       .catch(err => console.log(err));
// }

exports.postDestroy = (req, res, next) => {
    console.log('Delete');
    console.log('id', req.body.id);
    
    const id = req.body.id;
    Category.deleteOne({_id: id}).catch(err => console.log(err));
}