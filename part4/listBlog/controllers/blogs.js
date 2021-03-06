const Blog = require('../models/blog')
const User = require('../models/user')
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

  const { id } = decodedToken

  const newBlog = new Blog({ ...body, user: [id] })

  const requestBlog = await newBlog.save()

  const requestUser = await User.findByIdAndUpdate(
    id,
    { $push: { blogs: requestBlog._id } },
    { new: true, fields: ['id', 'name', 'username'] },
  )

  if (requestBlog && requestUser)
    res
      .status(200)
      .json({ ...requestBlog.toJSON(), user: [{ ...requestUser.toJSON() }] })
}

const deleteBlogById = async (req, res) => {
  const idBlogToDelete = req.params.id
  const token = req.token

  console.log('id blog to delete', idBlogToDelete)
  console.log('token', token)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const searchBlog = await Blog.findById(idBlogToDelete)

  if (searchBlog) {
    if (searchBlog.user[0].toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(idBlogToDelete)

      const requestUser = await User.findByIdAndUpdate(searchBlog.user[0], {
        $pull: { blogs: { $in: idBlogToDelete } },
      })

      if (requestUser) {
        return res.status(204).end()
      }
    } else {
      return res
        .status(401)
        .json({ error: 'user not allowed to delete this blog' })
    }
  } else {
    console.log('hola 9')
    res.status(404).end()
  }
}

const updateBlogById = async (req, res) => {
  const idBlogToUpdate = req.params.id
  const bodyToUpdate = req.body

  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const resBlogUpdate = await Blog.findByIdAndUpdate(
    idBlogToUpdate,
    bodyToUpdate,
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

const getBlogById = async (req, res) => {
  const id = req.params.id

  const requestBlog = await Blog.findById(id).populate('user')

  if (requestBlog) {
    res.status(200).json(requestBlog)
  } else {
    res.status(404).end()
  }
}

const addComment = async (req, res) => {
  const id = req.params.id
  const body = req.body.comment

  const request = await Blog.findByIdAndUpdate(
    id,
    {
      $push: { comments: body },
    },
    { new: true },
  )

  if (request) {
    res.status(201).json(request)
  }
}

module.exports = {
  getAllBlogs,
  createNewBlog,
  deleteBlogById,
  updateBlogById,
  getBlogById,
  addComment,
}
