const express = require('express')
const router = express.Router()
const { PostController } = require('../controllers')
const { usermiddleware }  = require('../middleware');
const { postValidation }  = require('../validation');


router.get('/' ,usermiddleware.ageVerification,usermiddleware.qualification, PostController.index)
router.post('/',postValidation.postValidation, PostController.store)
router.put('/:id', PostController.update)
router.delete('/:id', PostController.destroy)
router.get('/:id', PostController.details)

module.exports = router