const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const api = supertest(app)
let token = ''
let tokenData = ''

const helperBlog = require('./helperBlog')
const helperUser = require('./helperUser')

beforeAll(async () => {
  await User.deleteMany({})

  const firstUser = helperUser.listUsersTest[0]

  const salt = await bcrypt.genSalt(10)

  const createPasswordHashed = await bcrypt.hash(firstUser.password, salt)

  let newUser = new User({
    username: firstUser.username,
    password: createPasswordHashed,
    name: firstUser.name,
  })
  await newUser.save()

  const requestUser = await api.get('/api/auth/signin').send({
    username: firstUser.username,
    password: firstUser.password,
  })

  token = requestUser.body.token
  console.log(token)

  tokenData = jwt.verify(token, process.env.SECRET)
})

beforeEach(async () => {
  await helperBlog.deleteBlogs()

  for (let blog of helperBlog.blogsTest) {
    let newBlog = new Blog({ ...blog, user: [tokenData.id] })
    await newBlog.save()
  }
})

describe('test the url api/blogs', () => {
  test('test get api/blogs', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helperBlog.blogsTest.length)
  })
})

describe('test id defined in a blog', () => {
  test('testing id in firts 2 blogs', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
    expect(result.body[1].id).toBeDefined()
  })
})

describe('test post blog', () => {
  test('post api blog and valid data', async () => {
    const newBlog = {
      title: 'ultima hora noticias importantes del ayer y hoy',
      author: 'Gianicola Jara',
      url: 'https://cloud.mongodb.com/',
      likes: 15,
      user: [tokenData.id],
    }

    const responsePost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')

    expect(responsePost.status).toEqual(200)

    const response = await api
      .get('/api/blogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(response.body).toHaveLength(helperBlog.blogsTest.length + 1)
    expect(response.status).toEqual(200)

    const listBlogsDb = await helperBlog.getTitleBlogs()

    expect(listBlogsDb).toContain(
      'ultima hora noticias importantes del ayer y hoy',
    )
  })
  test('like check default', async () => {
    const newBlog = {
      title: 'probando los likes de los blogs',
      author: 'Gianicola Jara',
      url: 'https://cloud.mongodb.com/',
      user: [tokenData.id],
    }

    const responsePost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')

    expect(responsePost.status).toEqual(200)

    const likeCheck = await helperBlog.getLastBlog()

    expect(likeCheck.likes).toEqual(0)
  })
  test('check title and url fields', async () => {
    const newBlog = {
      author: 'Gianicola Jara',
      likes: 25,
    }

    const request = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')

    expect(request.status).toEqual(400)
  })
})

describe('test delete blog', () => {
  test('delete firts blog', async () => {
    const blogAtStart = await helperBlog.getBlogs()
    const blogToDelete = blogAtStart[0]

    const requestDelete = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(requestDelete.status).toEqual(204)

    const blogAtEnd = await helperBlog.getBlogs()

    expect(blogAtEnd).toHaveLength(helperBlog.blogsTest.length - 1)

    const contents = blogAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updated likes', () => {
  test('update 1 like', async () => {
    const getAtStartBlog = await helperBlog.getBlogs()
    const firtsBlogAtStart = getAtStartBlog[0]

    const request = await api
      .put(`/api/blogs/${firtsBlogAtStart.id}`)
      .send({
        ...helperBlog.blogsTest[0],
        likes: helperBlog.blogsTest[0].likes + 1,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(request.status).toEqual(200)

    const getAtEndBlog = await helperBlog.getBlogs()
    const firtsBlogAtEnd = getAtEndBlog[0]

    expect(firtsBlogAtEnd.likes).toEqual(firtsBlogAtStart.likes + 1)
  })
})

describe('Get 401 error post without token', () => {
  test('401 http status', async () => {
    const newBlog = {
      title: 'ultima hora noticias importantes del ayer y hoy',
      author: 'Gianicola Jara',
      url: 'https://cloud.mongodb.com/',
      likes: 15,
      user: [tokenData.id],
    }

    const responsePost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')

    expect(responsePost.status).toEqual(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
