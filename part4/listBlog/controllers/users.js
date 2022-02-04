const User = require('../models/user')

const getAllUsers = async (req, res) => {
  const results = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  res.status(200).json(results)
}

const createNewUser = async (req, res) => {
  const body = req.body

  const newUser = new User({
    username: body.username,
    password: await User.hashPassword(body.password),
    name: body.name,
    blogs: body.blogs,
  })

  const request = await newUser.save()
  res.status(201).json({ message: 'User Created', user: request.toJSON() })
}

const getUserById = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).populate('blogs')
  res.status(200).json(user)
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
}
