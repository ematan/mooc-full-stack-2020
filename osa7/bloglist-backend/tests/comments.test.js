const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const Comment = require('../models/comment')
const Blog = require('../models/blog')
const User = require('../models/user')
const data = require('./blogs')


const api = supertest(app)

/*const login = {
  username: 'tester', password: 'password'
}*/

beforeEach(async () => {
  await Blog.deleteMany({})
  await Comment.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const savedUser = await new User({
    username: 'tester',
    name: 'Tester',
    passwordHash
  }).save()

  data.initialBlogs = data.initialBlogs.map(b => {
    b.user = savedUser._id
    return b
  })

  const blogObjects = data.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there are no comments', () => {


  test('create comment', async () => {

    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(result.body[0].comments.length).toBe(0)

    const blogId = result.body[0].id
    const url = `/api/blogs/${blogId}/comments`
    await api
      .post(url)
      .send(data.comment)
      .expect(201)
    const response = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.comments[0].content).toBe(data.comment.content)

  })
})

afterAll(() => {
  mongoose.connection.close()
})