const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('comments')
  response.json(blog)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)

  const comment = new Comment(body)
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter