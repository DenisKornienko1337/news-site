const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')

router.get('/', categoryController.getIndex)

// router.get('/:id', postController.getPost)

router.post('/', categoryController.postAddCategory)

// router.post('/edit-post/', categoryController.postUpdatePost)

router.post('/delete-category', categoryController.postDestroy);

module.exports = router