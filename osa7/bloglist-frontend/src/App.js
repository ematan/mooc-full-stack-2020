import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

import { initializeBlogs } from './reducers/blogReducer'
import { logout, checkTokenForLogin } from './reducers/userReducer'

import './App.css'

const App = () => {

  const user = useSelector(state => state.user)

  //initialize blogs
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(checkTokenForLogin())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const LogOutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification />

          <LoginForm />
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <Notification />

          <p>Hello {user.name} <LogOutButton /></p>
          <Togglable buttonLabel="new blog">
            <CreateForm />
          </Togglable>
          <h2>Blogs on server:</h2>
          <BlogList user={user} />
        </div>
      }

    </div>
  )
}

export default App