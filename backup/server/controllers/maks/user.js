const Users = require('../../models/maks/users')

exports.getIndex = (req, res) => {
    Users.find({})    
      .sort({ _id: -1 })
      .then(users => res.send({ users: users }))
      .catch(err => res.sendStatus(500))
}

exports.getUser = (req, res) => {
    const userId = req.body.id;

    Post.findById(userId)
      .then(user => res.send({ user: user }))
      .catch(err => res.sendStatus(500))
}