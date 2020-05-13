const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')

router.post('/add-user', usersController.addUser)
router.post('/login', usersController.logIn)
router.get('/logout', usersController.logOut)
router.get('/auth', authController.isAuth)

module.exports = router