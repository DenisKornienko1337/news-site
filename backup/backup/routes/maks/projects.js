const express = require('express')
const router = express.Router()
const projectController = require('../../controllers/maks/projects')

router.get('/', projectController.getIndex)

router.post('/item', projectController.getProject)

module.exports = router