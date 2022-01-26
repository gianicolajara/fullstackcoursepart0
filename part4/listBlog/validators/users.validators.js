const { body } = require('express-validator')

const usersValidators = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('The username field is required')
    .isLength({ min: 3, max: 18 })
    .withMessage('The username field must have between 3 to 18 characters')
    .isString()
    .withMessage('The username field must be type string')
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('The password field is required')
    .isLength({ min: 3, max: 18 })
    .withMessage('The password field must have between 3 to 18 characters'),
  body('name')
    .trim()
    .optional()
    .isLength({ min: 3, max: 18 })
    .withMessage('The name field must have between 3 to 18 characters')
    .isString()
    .withMessage('The name field must be type string')
    .escape(),
]

const signinValidation = [usersValidators[0], usersValidators[1]]

module.exports = { usersValidators, signinValidation }
