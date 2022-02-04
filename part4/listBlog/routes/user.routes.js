const routerUsers = require('express').Router()
const userController = require('../controllers/users')

routerUsers.get('/', userController.getAllUsers)

routerUsers.get('/:id', userController.getUserById)

module.exports = routerUsers
