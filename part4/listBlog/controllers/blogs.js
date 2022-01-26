const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const getAllBlogs = async (req, res) => {
  const request = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  if (request) res.status(200).json(request)
}

const createNewBlog = async (req, res) => {
  const body = req.body
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const newBlog = new Blog({ ...body, user: [decodedToken.id] })
  const request = await newBlog.save()

  if (request) res.status(200).json(request)
}

const deleteBlogById = async (req, res) => {
  const idBlogToDelete = req.params.id
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const searchBlog = await Blog.findById(idBlogToDelete)

  if (searchBlog) {
    if (searchBlog.user.toString() === decodedToken.id.toString()) {
      const request = await Blog.findByIdAndDelete(idBlogToDelete)
      if (request) return res.status(204).end()
    } else {
      return res
        .status(401)
        .json({ error: 'user not allowed to delete this blog' })
    }
  } else {
    res.status(404).end()
  }
}

const updateBlogById = async (req, res) => {
  const idBlogToUpdate = req.params.id
  const bodyToUpdate = req.body

  const token = req.token

  console.log(token)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  let getBlog = await Blog.findById(idBlogToUpdate)

  console.log(getBlog)

  const resBlogUpdate = await Blog.findByIdAndUpdate(
    idBlogToUpdate,
    { ...bodyToUpdate, likes: getBlog.likes + 1 },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  )

  if (resBlogUpdate) {
    res.status(200).json(resBlogUpdate)
  } else {
    res.status(404).end()
  }
}

module.exports = {
  getAllBlogs,
  createNewBlog,
  deleteBlogById,
  updateBlogById,
}