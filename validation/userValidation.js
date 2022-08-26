const { body, validationResult } = require('express-validator');

const userValidation = [
    body('firstName').not().isEmpty().trim().withMessage('First name is required').isLength({min:2, max:100}).withMessage('Minimun Length should be 2 and maximum leangth should be 100 allowed'),
    body('lastName').not().isEmpty().trim().withMessage('Last name is required').isLength({min:2, max:100}).withMessage('Minimun Length should be 2 and maximum leangth should be 100 allowed'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage("Email should be valid"),
    body('password').not().isEmpty().withMessage('Password is required').contains('@', { ignoreCase: true}).withMessage('Password should contains special character'),
    body('mobileNumber').not().isEmpty().withMessage('Mobile number is required').isMobilePhone().withMessage('Invalid Mobile number'),
    body('status').not().isEmpty().withMessage('Status is required').isIn(['1','Inactive']).withMessage('Status should be Active or Inactive'),
    (req, res, next) => {
        var errors  = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    userValidation
}