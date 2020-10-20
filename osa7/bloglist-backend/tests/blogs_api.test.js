const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const data = require('./blogs')
const Blog = require('../models/blog')
const data = require('./blogs')
const User = require('../models/user')
const bcrypt = require('bcrypt')
//const initialBlogs = data.initialBlogs
//const newBlog = data.newBlog

const api = supertest(app)

const login = {
  username: 'tester', password: 'password'
}


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const savedUser = await new User({
    username: 'tester',
    name: 'Tester',
    passwordHash
  }).save()

  //second user should have no blog posts to their name
  const passwordHash2 = await bcrypt.hash('wrong', 10)
  await new User({
    username: 'badtester',
    name: 'Bad Tester',
    passwordHash2
  }).save()

  data.initialBlogs = data.initialBlogs.map(b => {
    b.user = savedUser._id
    return b
  })

  //console.log(data.initialBlogs)

  const blogObjects = data.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('GET /api/blogs', () => {
  test('API returns correct number of blogs (all)', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.length).toBe(data.initialBlogs.length)
  })

  test('All blogs have and "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

  })
})

describe('HTTP POST', () => {
  test('POST to /api/blog creates new blog to db', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(data.newBlog)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(data.initialBlogs.length +1)
  })

  test('new Blog format should macth intended format', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(data.newBlog)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[response.body.length -1]).toMatchObject(data.newBlog)
  })

  test('POST fails with 401 if no authorization', async () => {
    await api
      .post('/api/blogs')
      .send(data.newBlog)
      .expect(401)
  })
})

describe('Undefined/missing fields', () => {
  test('"likes" will default to 0 when undefined', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(data.newBlog_noLikes)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[response.body.length-1].likes).toBe(0)
  })

  test('missing title in blog returns 400 Bad request', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(data.newBlog_noTitle)
      .expect(400)
  })

  test('missing url in blog returns 400 Bad request', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(data.newBlog_noUrl)
      .expect(400)
  })
})

describe('DELETE', () => {
  test('API should return correct amount of blogs after DELETE', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token

    const resp = await api.get('/api/blogs')
    const id = resp.body[0].id
    await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(204)

    const resp2 = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resp2.body.length).toBe(data.initialBlogs.length -1)
  })

  test('Incorrect or missing id should return error', async () => {
    const loginResponse = await api.post('/api/login').send(login)
    const token = loginResponse.body.token

    //400 Bad request
    await api.delete('/api/blogs/test').set('Authorization', `Bearer ${token}`).expect(400)
    //404 Not found
    await api.delete('/api/blogs/').set('Authorization', `Bearer ${token}`).expect(404)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(data.initialBlogs.length)
  })

  test('delete without or with wrong authorization returns 401', async () => {
    const resp = await api.get('/api/blogs')
    const id = resp.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(401)

    const loginResponse = await api.post('/api/login').send({ username: 'badtester', password: 'wrong' })
    const token = loginResponse.body.token
    await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(401)
  })

})

describe('UPDATE', () => {
  test('API should return correct amount of blogs after UPDATE', async () => {
    const resp = await api.get('/api/blogs')
    const blog = resp.body[0]
    blog.likes = blog.likes+1
    await api.put(`/api/blogs/${blog.id}`).send(blog).expect(200)

    const resp2 = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resp2.body.length).toBe(data.initialBlogs.length)
  })

  test('Incorrect or missing id should return error', async () => {
    await api.put('/api/blogs/test').send(data.newBlog).expect(400)
    await api.put('/api/blogs/').send(data.newBlog).expect(404)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(data.initialBlogs.length)
  })

  test('API should return correct blog after UPDATE', async () => {
    const resp = await api.get('/api/blogs')
    const blog = resp.body[0]
    await api.put(`/api/blogs/${blog.id}`).send(data.newBlog).expect(200)

    const resp2 = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resp2.body).toMatchObject(data.newBlog)
  })

})



afterAll(() => {
  mongoose.connection.close()
})