const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const { userValidation } = require('../validation')

router.get('/' , UserController.index)
router.post('/', userValidation.userValidation,UserController.store)
router.put('/:id', UserController.update)
router.delete('/', UserController.destroy)
router.get('/:id', UserController.details)

module.exports = router