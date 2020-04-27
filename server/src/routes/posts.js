const express = require('express')
const router = express.Router()
const postController = require('../models/post')

router.post('/', postController.getIndex)

router.get('/:id', postController.getPost)

router.post('/', postController.postAddPost)

router.post('/edit-post/', postController.postUpdatePost)

router.post('/delete-post', postController.postDestroy);

module.exports = router