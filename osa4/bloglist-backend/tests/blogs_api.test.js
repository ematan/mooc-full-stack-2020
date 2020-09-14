const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const data = require('./blogs')
const Blog = require('../models/blog')
const { newBlog, initialBlogs, newBlog_noLikes, newBlog_noTitle, newBlog_noUrl } = require('./blogs')
//const initialBlogs = data.initialBlogs
//const newBlog = data.newBlog

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  //console.log('testDB cleared')

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  //console.log('DB initialized')
})


describe('GET /api/blogs', () => {
  test('API returns correct number of blogs (all)', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body.length).toBe(initialBlogs.length)
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
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(initialBlogs.length +1)
  })

  test('new Blog format should macth intended format', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[response.body.length -1]).toMatchObject(newBlog)
  })
})

describe('default', () => {
  test('"likes" will default to 0 when undefined', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog_noLikes)
      .expect(201)
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[response.body.length-1].likes).toBe(0)
  })

  test('missing title in blog returns 400 Bad request', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog_noTitle)
      .expect(400)
  })

  test('missing url in blog returns 400 Bad request', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog_noUrl)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})