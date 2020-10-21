import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ user, blog, handleRemove }) => {
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

  //TODO:add user to returned blog somehow, fix message
  const dispatch = useDispatch()
  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    dispatch(likeBlog(id))
    const msg = 'Voted'
    dispatch(setNotification({ msg:msg, color:'green' }, 5))
  }



  const ExpandButton = () => (
    <button className='expandButton' onClick={() => setShow(!showInfo)}>
      {showInfo ? 'hide' : 'view'}
    </button>
  )

  return (
    <div className='singleBlog' style={blogStyle}>
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
  //handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
