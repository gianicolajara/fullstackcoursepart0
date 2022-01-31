const User = require('../models/user')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  const body = req.body

  const newUser = new User({
    username: body.username,
    password: await User.hashPassword(body.password),
    name: body.name,
    blogs: body.blogs,
  })

  const request = await newUser.save()

  if (request) {
    res.status(201).json({ message: 'User Created', user: request.toJSON() })
  } else {
    res.status(500).json({ message: 'User could not be created' })
  }
}

const signin = async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect =
    user === null
      ? false
      : await User.comparePassword(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '24h' })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
}

module.exports = {
  signup,
  signin,
}
