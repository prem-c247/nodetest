const { body, validationResult } = require('express-validator');

const postValidation = [
    body('title').not().isEmpty().trim().withMessage('Title is required').isLength({min:2, max:10}).withMessage('Minimun Length should be 2 and maximum leangth should be 10 allowed'),
    body('description').not().isEmpty().trim().withMessage('Description is required').isLength({min:2, max:50}).withMessage('Minimun Length should be 2 and maximum leangth should be 50 allowed'),
    body('image').not().isEmpty().withMessage('Image is required'),
    body('status').not().isEmpty().withMessage('Status is required').isIn(['Active','Inactive']).withMessage('Status should be Active or Inactive'),
    (req, res, next) => {
        var errors  = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    postValidation
}