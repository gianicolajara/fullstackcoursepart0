const { body } = require('express-validator')

const blogsValidators = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('The title field is required')
    .isLength({ min: 3 })
    .withMessage('The title field must have 3 characters')
    .isString()
    .withMessage('The title field must be type string')
    .escape(),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('The author field is required')
    .isLength({ min: 3 })
    .withMessage('The author field must have 3 characters')
    .isString()
    .withMessage('The author field must be type string')
    .escape(),
  body('url')
    .trim()
    .notEmpty()
    .withMessage('The url field is required')
    .isURL()
    .withMessage('The url field must be valid url'),
  body('likes')
    .default(0)
    .isNumeric()
    .withMessage('The likes field must be type numeric'),
  body('user')
    .optional()
    .isArray()
    .withMessage('The user field must be type array'),
]

module.exports = blogsValidators
