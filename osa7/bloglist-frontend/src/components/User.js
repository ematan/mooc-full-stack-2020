import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h1>{user.name}</h1>

      {user.blogs
        ?
        <div>
          <p>added blogs</p>
          <ul>
            {user.blogs.map(b => {
              return <li key={b.id}>{b.title}</li>
            })}
          </ul>
        </div>
        : <p>no added blogs</p>
      }

    </div>
  )

}

User.propTypes = {
  user: PropTypes.object
}

export default User