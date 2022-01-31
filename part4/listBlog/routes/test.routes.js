const { resetAll } = require('../controllers/reset')

const testRoutes = require('express').Router()

testRoutes.post('/reset', resetAll)

module.exports = testRoutes
