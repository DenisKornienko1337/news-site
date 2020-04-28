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
    console.log('Delete');
    console.log('id', req.body.id);
    
    const id = req.body.id;
    Category.deleteOne({_id: id}).catch(err => console.log(err));
}