const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const isAuth = require('../middleware/is-auth')
const isSuperuser = require('../middleware/is-superuser')

router.post('/add-user', usersController.addUser)
router.post('/login', usersController.logIn)
router.get('/logout', usersController.logOut)
router.get('/permissions', usersController.fetchPermissions)
router.post('/delete-user', isAuth, isSuperuser, usersController.removeUser);

module.exports = router