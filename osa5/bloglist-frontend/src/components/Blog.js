import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showInfo, setShow] = useState(false)

  const hideWhenVisible = { display: showInfo ? 'none' : '' }
  const showWhenVisible = { display: showInfo ? '' : 'none' }

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
      Likes {blog.likes} <button>like</button><br/>
      {blog.user.name} <br/>

    </div>
  </div>
  )
}

export default Blog
