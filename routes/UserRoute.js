const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const { userValidation,loginValidation } = require('../validation')
const { auth } = require("../middleware");

router.get('/' , UserController.index)
router.post('/', userValidation.userValidation,UserController.store)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.destroy)
router.get('/:id', UserController.details)
router.post('/admin-login', loginValidation.loginValidation, UserController.adminLogin)
router.post('/admin-dashboard',auth.verifyToken, UserController.userDashboard)

module.exports = router