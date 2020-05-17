const User = require('../models/user')
const Permission = require('../models/permission')
const Post = require('../models/post')
const Category = require('../models/category')

const bcrypt = require('bcrypt')
const saltRounds = 10

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        Permission.find({'slug': 'user'})
        .then(permission => {
            const user = new User({
                name: req.body.name,
                password: hash,
                permission: permission[0].slug,
            })
            user.save()
            req.session.isLoggedIn = true
            req.session.user = user._id
            res.sendStatus(200)
        })        
        .catch(err => {
            console.log(err)
            if(err) res.sendStatus(500)
        })
      });
}

exports.removeUser = (req, res) => {
    // let userId = req.body.id
    // User.deleteOne({_id: userId})
    // .then(result => {
        
    // })
    // .catch((err) => {
    //     res.sendStatus(500)
    // })
}

exports.logIn = (req, res, next) => {
    User.findOne({name: req.body.name})
        .then(user => {
            if(user!==null) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) console.log(err)
                    if(result) {
                        req.session.isLoggedIn = true
                        req.session.user = user._id
                        res.sendStatus(200)
                    } else {
                        return res.sendStatus(401)
                    }
                  });
            } else {
                res.sendStatus(401)
            }
        })
}

exports.logOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
        res.sendStatus(200)
    })
}

exports.fetchPermissions = (req, res) => {
    Permission.find({})
    .then(permissions => {
        res.send({permissions: permissions})
        res.sendStatus(200)
    })
    .catch(err => {res.sendStatus(500)})
}