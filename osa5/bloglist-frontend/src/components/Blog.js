import React, { useState } from 'react'
const Blog = ({ user, blog, handleLikes, handleRemove }) => {
  const [showInfo, setShow] = useState(false)

  const hideWhenVisible = { display: showInfo ? 'none' : '' }
  const showWhenVisible = { display: showInfo ? '' : 'none' }

  const id = blog.id
  const userIsCreator = blog.user.username === user.username

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <b>{blog.title}</b> {blog.author}
    <button style={hideWhenVisible} onClick={() => setShow(true)}>view</button>
    <button style={showWhenVisible} onClick={() => setShow(false)}>hide</button>
    <div style={showWhenVisible}>

      {blog.url} <br/>
      Likes {blog.likes} <button value={id} onClick={handleLikes}>like</button><br/>
      {blog.user.name} <br/>
      {userIsCreator && <button value={id} onClick={handleRemove}>remove</button>}
    </div>
  </div>
  )
}

export default Blog
