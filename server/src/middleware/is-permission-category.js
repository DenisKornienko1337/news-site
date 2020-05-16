const Category = require('../models/category')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (req, res, next) => {
    if(!req.body.id) {
        res.sendStatus(500)
        return
    }
    console.log(req.body.id)
    next()
}