const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')

const isAuth = require('../middleware/is-auth')
const isSuperuser = require('../middleware/is-superuser')

router.get('/', usersController.fetchUsers)
router.post('/add-user', usersController.addUser)
router.post('/login', usersController.logIn)
router.get('/logout', usersController.logOut)
router.get('/auth', authController.isAuth)
router.get('/permissions', usersController.fetchPermissions)

router.post('/add-avatar', isAuth, usersController.addAvatar)
router.post('/change-username', isAuth, usersController.changeUserName)
router.post('/change-password', isAuth, usersController.changePassword)
router.post('/delete-user', isAuth, isSuperuser, usersController.removeUser)
router.post('/change-permission', isAuth, isSuperuser, usersController.changePermission)

module.exports = router