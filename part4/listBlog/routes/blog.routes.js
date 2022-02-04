const routerBlog = require('express').Router()
const blogController = require('../controllers/blogs')
const blogsValidator = require('../validators/blogs.validators')
const middlewares = require('../utils/middlesware')
const commnetsValidator = require('../validators/comments.validators')

routerBlog.get('/', blogController.getAllBlogs)

routerBlog.post(
  '/:id/comments',
  [...commnetsValidator, middlewares.handleValidatorErrors],
  blogController.addComment,
)

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

routerBlog.get('/:id', blogController.getBlogById)

module.exports = routerBlog
