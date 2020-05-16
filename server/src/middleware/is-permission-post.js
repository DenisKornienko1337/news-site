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
    User.find({})
    .then(users => {
        users.forEach(user => {
            bcrypt.compare(String(user._id), req.session.user, function(err, result){
                if(result){
                    Post.findById(req.body.id)
                    .then(post => {
                        if(user.permission=='superuser' || post.user==user._id) next()
                        else res.sendStatus(401)
                    })
                }
            })
        })
    })
}