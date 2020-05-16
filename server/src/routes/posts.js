const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const isAuth = require('../middleware/is-auth')
const isPermissionPost = require('../middleware/is-permission-post')

router.get('/', postController.getIndex)

router.post('/item', postController.getPost)

router.post('/', isAuth, postController.postAddPost)

router.post('/edit-post/', isAuth, isPermissionPost, postController.postUpdatePost)

router.post('/delete-post', isAuth, isPermissionPost, postController.postDestroy);

module.exports = router