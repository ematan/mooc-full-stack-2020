import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLikes, handleRemove }) => {
  const [showInfo, setShow] = useState(false)

  const ExpandStatus = { display: showInfo ? '' : 'none' }

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

  const ExpandButton = () => (
    <button className='expandButton' onClick={() => setShow(!showInfo)}>
      {showInfo ? 'hide' : 'view'}
    </button>
  )

  return (
    <div style={blogStyle}>
      <b>{blog.title}</b> {blog.author}
      <ExpandButton />
      <div className='extraInfo' style={ExpandStatus}>

        {blog.url} <br/>
        Likes {blog.likes} <button className='likeButton' value={id} onClick={handleLikes}>like</button><br/>
        {blog.user.name} <br/>
        {userIsCreator && <button value={id} onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
