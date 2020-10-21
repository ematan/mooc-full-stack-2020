import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>

    </div>
  )
}

export default CreateForm
