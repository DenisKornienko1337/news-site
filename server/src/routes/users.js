const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.post('/add-user', usersController.addUser)
router.post('/login', usersController.logIn)

module.exports = router