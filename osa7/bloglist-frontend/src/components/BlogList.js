import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const handleRemove = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirmed){
      dispatch(deleteBlog(id))
    }
  }

  return (
    <div id='blogList'>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(b =>
          <Blog
            key={b.id}
            user={user}
            blog={b}

            handleRemove={handleRemove}
          />
        )
      }
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogList