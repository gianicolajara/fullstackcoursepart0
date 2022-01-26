const authRoutes = require('express').Router()
const authController = require('../controllers/auth')
const middlewares = require('../utils/middlesware')
const userValidators = require('../validators/users.validators')

authRoutes.post(
  '/signup',
  [
    ...userValidators.usersValidators,
    middlewares.handleValidatorErrors,
    middlewares.verifyArrayIdBlogs,
  ],
  authController.signup,
)

authRoutes.post(
  '/signin',
  [
    ...userValidators.signinValidation,
    middlewares.handleValidatorErrors,
    middlewares.verifyArrayIdBlogs,
  ],
  authController.signin,
)

module.exports = authRoutes
