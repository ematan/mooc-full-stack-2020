import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const Comment = ({ comment }) => {
  return(
    <li>{comment.content}</li>
  )
}
Comment.propTypes = {
  comment: PropTypes.object
}

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => setComment(event.target.value)

  const dispatch = useDispatch()

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      const content = { content: comment }
      setComment('')
      dispatch(addComment(blogId, content))
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <form onSubmit={handleAddComment}>
      <div>
        comment:
        <input
          id="comment"
          type='text'
          value={comment}
          name='Comment'
          onChange={handleCommentChange}
        />
      </div>
      <button id='createcomment-button' type='submit'>create</button>
    </form>
  )
}
CommentForm.propTypes = {
  blogId: PropTypes.string
}

const BlogView = ({ blog, user, handleRemove, handleLikes }) => {
  if (!blog) return null

  const userIsCreator = blog.user.username === user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button className='likeButton' value={blog.id} onClick={handleLikes}>like</button><br/>
      added by {blog.user.name} <br/>
      {userIsCreator && <button value={blog.id} onClick={handleRemove}>remove</button>} <br />
      <h2>comments</h2>
      {blog.comments && blog.comments[0]
        ? <ul>
          {blog.comments.map(c =>
            <Comment key={c.id} comment={c} />
          )}
        </ul>
        : <p>No comments for this blog yet</p>
      }
      <CommentForm blogId={blog.id}/>
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