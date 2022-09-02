const { body, validationResult } = require('express-validator');
const { UserModel } = require('../models');

const loginValidation = [
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage("Email should be valid"),
    body('password').not().isEmpty().withMessage('Password is required').contains('@', { ignoreCase: true}).withMessage('Password should contains @ special character'),
    (req, res, next) => {
        var errors  = validationResult(req);
        if (!errors.isEmpty()) {
            var errorArray = errors.array();
            let errorMessages = {};
            errorArray.forEach((error) => {
                errorMessages[error.param] = error.msg;
              });
            return res.status(422).json({ message:'Invalid Request', errors: errorMessages });
        }
        next();
    }
]

module.exports = {
    loginValidation
}