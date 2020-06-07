const User = require('../models/user')
const Permission = require('../models/permission')
const Post = require('../models/post')
const Category = require('../models/category')
const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

getRandomInt = (min, max) =>  Math.floor(Math.random() * (max-min+1)+min)

getRandomColor = () => {
    let color = [0,0,0,0,0,0]
    for(let i=0; i<color.length; ++i) {
        color[i] = getRandomInt(0, 15).toString(16)
    }
    return '#'+color.join('').toUpperCase()
}

exports.fetchUsers = (req, res) => {
    User.find()
    .then(users => {
        res.send({users: users})
    })
    .catch(err => {
        res.sendStatus(500)
    })
}

exports.addAvatar = (req, res) => {
    const username = req.body.username
    if(username != req.session.user) {
        res.sendStatus(401)
        return
    }
    const imagePath = path.resolve(__dirname, '..').replace(/\\/g, '/')+'/public/'
    let base64Image = req.body.image.replace(/^data:image\/[a-z]+;base64,/, "")
    let binaryImage = new Buffer(base64Image, 'base64')
    let imageId = uuidv4().toString()
    let imageFile = imageId+'.jpg'
    let fullImagePath = '/public/'+imageId
    fs.writeFileSync(imagePath+imageFile, binaryImage)
    User.find({'name': username})
    .then((user) => {
        user.image = fullImagePath
    })
    .catch((err) => {
        res.sendStatus(500)
    })
}

exports.changeUserName = (req, res) => {
    if(username != req.session.user) {
        res.sendStatus(401)
        return
    }
    const oldUserName = req.body.oldUserName
    const newUserName = req.body.newUserName

    User.find({'name': oldUserName})
    .then((user) => {
        user.name = newUserName
    })
    .catch((err) => {
        res.sendStatus(500)
    })
}

exports.changePassword = (req, res) => {
    if(username != req.session.user) {
        res.sendStatus(401)
        return
    }
    const userName = req.body.username
    const newPassword = req.body.password

    User.find({'name': userName})
    .then((user) => {
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            user.password = hash
        })
    })
    .catch((err) => {
        res.sendStatus(500)
    })
}

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        Permission.find({'slug': 'user'})
        .then(permission => {
            const user = new User({
                name: req.body.name,
                password: hash,
                permission: permission[0].slug,
            })
            return user.save()

        })   
        .then(() => {
            User.find({'name': req.body.name})
            .then(user => {
                console.log(user)
                req.session.isLoggedIn = true
                req.session.user = user[0]._id
                req.session.username = user[0].name
                req.session.color = getRandomColor()
                res.cookie('isLoggedIn', 'true')
                res.sendStatus(200)
            })
            .catch(err => {
                res.sendStatus(500)
            })
        })
        .catch(err => {
            if(err) {
                console.log(err)
                res.sendStatus(500)
            }
        })
      });
}

exports.removeUser = (req, res) => {
    let userName = req.body.username
    User.deleteOne({name: userName})
    .then(result => {
        res.sendStatus(200)
    })
    .catch((err) => {
        res.sendStatus(500)
    })
}

exports.logIn = (req, res, next) => {
    console.log(111111111111111111)
    console.log(getRandomColor())
    console.log(11111111111111111)
    User.findOne({name: req.body.name})
        .then(user => {
            if(user!==null) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) console.log(err)
                    if(result) {
                        req.session.isLoggedIn = true
                        req.session.user = user._id
                        req.session.username = user.name
                        req.session.color = getRandomColor()
                        res.cookie('isLoggedIn', 'true')
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

exports.changePermission = (req, res) => {
    let permission = req.body.permissionId
    let userId = req.session.user
    Permission.find({'slug': permission})
    .then(permission => {
        User.findById(userId)
        .then(user => {
            user.pemission = permission.slug
        })
        .catch(err => {
            res.sendStatus(500)
        })
    })
    .catch(err => {
        res.sendStatus(500)
    })
}