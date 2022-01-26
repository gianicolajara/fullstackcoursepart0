const routerBlog = require('express').Router()
const blogController = require('../controllers/blogs')
const blogsValidator = require('../validators/blogs.validators')
const middlewares = require('../utils/middlesware')

routerBlog.get('/', blogController.getAllBlogs)

routerBlog.post(
  '/',
  [
    ...blogsValidator,
    middlewares.handleValidatorErrors,
    middlewares.tokenExtractor,
    middlewares.verifyArrayIdUsers,
  ],
  blogController.createNewBlog,
)

routerBlog.delete(
  '/:id',
  [middlewares.tokenExtractor],
  blogController.deleteBlogById,
)

routerBlog.put(
  '/:id',
  [
    ...blogsValidator,
    middlewares.handleValidatorErrors,
    middlewares.tokenExtractor,
    middlewares.verifyArrayIdUsers,
  ],
  blogController.updateBlogById,
)

module.exports = routerBlog
