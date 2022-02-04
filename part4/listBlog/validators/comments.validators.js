const { body } = require('express-validator')

const commnetsValidator = [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('The comment field is required'),
]

module.exports = commnetsValidator
