const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat')

router.get('/', chatController.getIndex)

router.ws('/send-message', chatController.sendMessage)


module.exports = router