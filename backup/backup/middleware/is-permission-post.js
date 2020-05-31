const Post = require('../models/post')
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
        Post.findById(req.body.id)
        .then(post => {
            if(user.permission=='superuser' || post.userId.toString()==user._id.toString()) next()
            else res.sendStatus(401)
        })
    })
}