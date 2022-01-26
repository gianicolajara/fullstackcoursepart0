const logger = require('./loggers')
const { validationResult } = require('express-validator')
const User = require('../models/user')
const Blog = require('../models/blog')
const Issue = require('./error')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const handleValidatorErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errors.name = 'ExpressValidator'
    return next(errors)
  }
  next()
}

const handleError = (err, req, res, next) => {
  logger.info(err)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  } else if (err.name === 'ExpressValidator') {
    return res.status(400).send({ error: err.errors })
  } else if (err.name === 'VerifyArrayError') {
    return res.status(404).send({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    })
  } else if (err.name) {
    return res.status(500).send({ error: err.message })
  }
  next(err)
}

const verifyArrayIdUsers = async (req, res, next) => {
  const arrayIds = req.body.user

  if (!arrayIds || arrayIds.lenght === 0) {
    return next()
  }

  for (const id of arrayIds) {
    const request = await User.findById(id)
    if (!request) {
      const newIssue = new Issue(
        'VerifyArrayError',
        `user with id: ${id} dont exists on database`,
      )
      return next(newIssue)
    }
  }
  next()
}

const verifyArrayIdBlogs = async (req, res, next) => {
  const arrayBlogs = req.body.blogs

  if (!arrayBlogs || arrayBlogs.lenght === 0) {
    return next()
  }

  for (const id of arrayBlogs) {
    const request = await Blog.findById(id)
    if (!request) {
      const newIssue = new Issue(
        'VerifyArrayError',
        `blog with id: ${id} dont exists on database`,
      )
      return next(newIssue)
    }
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const authenticationBearer = req.get('authorization')

  if (
    authenticationBearer &&
    authenticationBearer.toLowerCase().startsWith('bearer ')
  ) {
    req.token = authenticationBearer.substring(7)
    return next()
  } else {
    return res.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  unknownEndpoint,
  handleError,
  handleValidatorErrors,
  verifyArrayIdUsers,
  verifyArrayIdBlogs,
  tokenExtractor,
}
