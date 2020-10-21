import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      <h2>Blogs on server:</h2>
      <div id='blogList'>
        {blogs
          .sort((a,b) => b.likes - a.likes)
          .map(b => {
            const url = `/blogs/${b.id}`
            return (
              <div key={b.id} className='singleBlog' style={blogStyle}>
                <Link to={url}>
                  {b.title} {b.author}
                </Link>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default BlogList