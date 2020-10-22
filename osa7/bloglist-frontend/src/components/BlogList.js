import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Blogs on server:</h2>
      <Table striped hover>
        <tbody>
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map(b => {
              const url = `/blogs/${b.id}`
              return (
                <tr key={b.id} className='singleBlog mr-auto'>

                  <Link to={url}>
                    <td>{b.title} {b.author}</td>
                  </Link>

                </tr>
              )
            }
            )
          }
        </tbody>
      </Table>
    </div>

  )
}

export default BlogList