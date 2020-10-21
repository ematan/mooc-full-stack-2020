import React from 'react'
import PropTypes from 'prop-types'

const BlogView = ({ blog, user, handleRemove, handleLikes }) => {
  if (!blog) return null

  const userIsCreator = blog.user.username === user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button className='likeButton' value={blog.id} onClick={handleLikes}>like</button><br/>
      added by {blog.user.name} <br/>
      {userIsCreator && <button value={blog.id} onClick={handleRemove}>remove</button>}
    </div>
  )
}

BlogView.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object,
  handleRemove: PropTypes.func.isRequired,
  handleLikes: PropTypes.func.isRequired,
}

export default BlogView