const express = require('express')
const router = express.Router()
const { CommentController } = require('../controllers')

router.get('/' , CommentController.index)
router.post('/', CommentController.store)
router.put('/:id', CommentController.update)
router.delete('/:id', CommentController.destroy)
router.get('/:id', CommentController.details)

module.exports = router