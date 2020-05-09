const User = require('../models/user')
const bcrypt = require('bcrypt')

const saltRounds = 10

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new User({
            name: req.body.name,
            password: hash
        })
        user.save()
        .then( () => {
            res.sendStatus(200)
        })
        .catch(err => {
            if(err) res.sendStatus(403)
        })
      });
}

exports.logIn = (req, res) => {
    User.findOne({name: req.body.name})
        .then(user => {
            if(user!==null) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) console.log(err)
                    if(result) {
                        console.log('success!')
                        req.session.isLoggedIn = true
                    } else {
                        return res.sendStatus(403)
                    }
                  });
            } else {
                res.sendStatus(403)
            }
        })
}