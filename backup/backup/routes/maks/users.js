const express = require('express')
const router = express.Router()
const userController = require('../../controllers/maks/user')

router.get('/', userController.getIndex)

router.post('/item', userController.getUser)

module.exports = router