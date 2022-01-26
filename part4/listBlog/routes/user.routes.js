const routerUsers = require('express').Router()
const userController = require('../controllers/users')

routerUsers.get('/', userController.getAllUsers)

module.exports = routerUsers
