const Blog = require('../models/blog')

const blogsTest = [
  {
    title: 'ultima hora noticia',
    author: 'Gianicola Jara',
    url: 'https://stackoverflow.com/',
    likes: 15,
  },
  {
    title: 'ultima hora noticias dos',
    author: 'Gianicola Jara',
    url: 'https://stackoverflow.com/',
    likes: 10,
  },
]

const getBlogs = async () => await Blog.find({})

const getTitleBlogs = async () => {
  const blogsDb = await Blog.find({})
  return blogsDb.map((item) => item.title)
}

const getLastBlog = async () => {
  const blogsDb = await Blog.find({})
  return blogsDb.at(-1)
}

const deleteBlogs = async () => await Blog.deleteMany({})

module.exports = {
  blogsTest,
  getBlogs,
  getTitleBlogs,
  getLastBlog,
  deleteBlogs,
}
