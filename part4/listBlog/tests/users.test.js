const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helperUser = require('./helperUser')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of helperUser.listUsersTest) {
    const newUser = new User(user)
    await newUser.save()
  }
})

describe('create users', () => {
  test('validating users that were created', async () => {
    const request = await api.get('/api/users')
    expect(request.status).toEqual(200)
    expect(request.body).toHaveLength(helperUser.listUsersTest.length)
    expect(request.body[0].name).toEqual(helperUser.listUsersTest[0].name)
    expect(request.body[0]).toHaveProperty('username', 'name', 'password')
  })
  test('creating invalid user', async () => {
    const invalidUser = {
      username: 'Gi',
      password: '12',
      name: 'Gi',
    }

    const expectedMessage = {
      error: [
        {
          value: 'Gi',
          msg: 'The username field must have between 3 to 18 characters',
          param: 'username',
          location: 'body',
        },
        {
          value: '12',
          msg: 'The password field must have between 3 to 18 characters',
          param: 'password',
          location: 'body',
        },
        {
          value: 'Gi',
          msg: 'The name field must have between 3 to 18 characters',
          param: 'name',
          location: 'body',
        },
      ],
    }

    const request = await api
      .post('/api/users')
      .send(invalidUser)
      .set('Accept', 'application/json')

    expect(request.status).toEqual(400)
    expect(request.body).toEqual(expectedMessage)
  })
  test('creating empty user', async () => {
    const invalidUser = {}
    const messageExpected = {
      error: [
        {
          value: '',
          msg: 'The username field is required',
          param: 'username',
          location: 'body',
        },
        {
          value: '',
          msg: 'The username field must have between 3 to 18 characters',
          param: 'username',
          location: 'body',
        },
        {
          value: '',
          msg: 'The password field is required',
          param: 'password',
          location: 'body',
        },
        {
          value: '',
          msg: 'The password field must have between 3 to 18 characters',
          param: 'password',
          location: 'body',
        },
      ],
    }

    const request = await api
      .post('/api/users')
      .send(invalidUser)
      .set('Accept', 'application/json')

    expect(request.status).toEqual(400)
    expect(request.body).toEqual(messageExpected)
  })
})

describe('get data users', () => {
  test('get all', async () => {
    const request = await api.get('/api/users')

    expect(request.status).toEqual(200)
    expect(request.body).toHaveLength(helperUser.listUsersTest.length)
    expect(request.body[0].name).toEqual(helperUser.listUsersTest[0].name)
    expect(request.body[0].username).toEqual(
      helperUser.listUsersTest[0].username,
    )
    expect(request.body[0].password).not.toBeDefined()
    expect(request.body[0].id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
