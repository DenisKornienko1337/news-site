const Post = require('../models/post')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10

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
            console.log(post.userId, user._id)
            if(user.permission=='superuser' || post.userId.toString()==user._id.toString()) next()
            else res.sendStatus(401)
        })
    })
}