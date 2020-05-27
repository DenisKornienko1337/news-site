const User = require('../models/user')

module.exports = (req, res, next) => {
    User.findById(req.session.user)
    .then(user => {
        if(user.permission=='superuser'){
            res.sendStatus(200)
            next()
        } else {
            res.sendStatus(401)
        }
    })
    .catch(err => {
        res.sendStatus(500)
    })
}