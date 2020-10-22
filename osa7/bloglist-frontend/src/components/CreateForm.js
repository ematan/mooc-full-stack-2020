import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateForm = (/*{ createBlog }*/) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const data = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createBlog(data))
    const msg = `Added new blog ${data.title} by ${data.author}`
    dispatch(setNotification({ msg:msg, color:'green' }, 5))
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </Form.Group>
        <Button variant="outline-dark" id='create-button' type='submit'>create</Button>
      </Form>

    </div>
  )
}

export default CreateForm
