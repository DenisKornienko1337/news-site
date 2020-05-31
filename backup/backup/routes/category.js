const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const isAuth = require('../middleware/is-auth')
const isPermissionCategory = require('../middleware/is-permission-category')

router.get('/', categoryController.getIndex)

router.get('/posts', categoryController.getPosts)

router.get('/user', categoryController.getUserIndex)

router.post('/', isAuth, categoryController.postAddCategory)

router.post('/item', categoryController.getCategory)

router.post('/edit-category', isAuth, isPermissionCategory, categoryController.postUpdateCategory)

router.post('/delete-category', isAuth, isPermissionCategory, categoryController.postDestroy);

module.exports = router