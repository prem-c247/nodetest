const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')

router.get('/' , UserController.index)
router.post('/', UserController.store)
router.put('/:id', UserController.update)
router.delete('/', UserController.destroy)
router.get('/:id', UserController.details)

module.exports = router