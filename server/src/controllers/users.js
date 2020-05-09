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
        .then(res => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(403)
        })
      });
}

exports.logIn = (req, res) => {
    console.log(req.body.name)
}