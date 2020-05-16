const User = require('../models/user')
const Permission = require('../models/permission')

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
            bcrypt.hash(String(user._id), saltRounds, function(err, hash){
                req.session.user = hash
                res.sendStatus(200)
            })
        })        
        .catch(err => {
            console.log(err)
            if(err) res.sendStatus(500)
        })
      });
}

exports.logIn = (req, res, next) => {
    User.findOne({name: req.body.name})
        .then(user => {
            if(user!==null) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) console.log(err)
                    if(result) {
                        req.session.isLoggedIn = true
                        res.cookie('Test', 'test')
                        bcrypt.hash(String(user._id), saltRounds, function(err, hash){
                            req.session.user = hash
                            console.log(hash)
                            res.sendStatus(200)
                        })
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