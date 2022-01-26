const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const logger = require('./utils/loggers')
const config = require('./utils/config')
const middlewares = require('./utils/middlesware')
const blogRoutes = require('./routes/blog.routes')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')

logger.info('connecting to', config.MONGODB_URI)

//mongo connect
const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('connect successful to mongodb cluster')
  } catch (error) {
    logger.error('connect mongodb error', error)
  }
}

connectDb()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use(middlewares.handleError)
app.use(middlewares.unknownEndpoint)

module.exports = app
