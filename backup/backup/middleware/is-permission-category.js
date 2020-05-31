const Category = require('../models/category')
const User = require('../models/user')

module.exports = (req, res, next) => {
    if(!req.body.id) {
        res.sendStatus(500)
        return
    }
    if(!req.session) {
        res.sendStatus(401)
        return
    }
    User.findById(req.session.user)
    .then(user => {
        console.log(req.body.id)
        Category.findById(req.body.id)
        .then(category => {
            console.log(category.userId, user._id)
            if(user.permission=='superuser' || category.userId.toString()==user._id.toString()) next()
            else res.sendStatus(401)
        })
    })
}