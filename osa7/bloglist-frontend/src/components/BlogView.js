import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

const Comment = ({ comment }) => {
  return(
    <ListGroup.Item>{comment.content}</ListGroup.Item>
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
    <Form onSubmit={handleAddComment}>
      <Form.Group>
        <Form.Label>Add a comment:</Form.Label>
        <Form.Control
          id="comment"
          type='text'
          value={comment}
          name='Comment'
          onChange={handleCommentChange}
        />
      </Form.Group>
      <Button variant="outline-dark" id='createcomment-button' type='submit'>create</Button>
    </Form>
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
      <Card body>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a><br />
        <b>{blog.likes}</b> likes <Button variant="outline-dark" className='likeButton' value={blog.id} onClick={handleLikes}>like</Button><br/>
        added by {blog.user.name} <br/>
        {userIsCreator && <button value={blog.id} onClick={handleRemove}>remove</button>} <br />
      </Card>
      <h2>comments</h2>
      {blog.comments && blog.comments[0]
        ? <ListGroup variant="flush">
          {blog.comments.map(c =>
            <Comment key={c.id} comment={c} />
          )}
        </ListGroup>
        : <p>No comments for this blog yet</p>
      }
      <Card body>
        <CommentForm blogId={blog.id}/>
      </Card>
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