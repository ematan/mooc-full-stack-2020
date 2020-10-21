import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import User from './components/User'

import { likeBlog, deleteBlog } from './reducers/blogReducer'


import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout, checkTokenForLogin } from './reducers/loginReducer'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import './App.css'


const App = () => {
  //initialize blogs
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const user = useSelector(state => state.user )
  const users = useSelector(state => state.users )
  const blogs = useSelector(state => state.blogs )

  useEffect(() => {
    dispatch(checkTokenForLogin())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const LogOutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const padding = {
    padding: 5
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    dispatch(likeBlog(id))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirmed){
      dispatch(deleteBlog(id))
    }
  }

  const matchUser = useRouteMatch('/users/:id')
  const routedUser = matchUser && users
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const routedBlog = matchBlog && blogs
    ? blogs.find(u => u.id === matchBlog.params.id)
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user ? <div style={padding}>{user.name} logged in <LogOutButton /></div> : null }
      </div>

      <Notification />
      {!user ?
        <div>
          <LoginForm />
        </div>
        :
        <div>
          <h2>Blogapp</h2>
          <Switch>
            <Route path='/users/:id'>
              <User user={routedUser} />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>

            <Route path='/blogs/:id'>
              <BlogView blog={routedBlog} user={user} handleLikes={handleLikes} handleRemove={handleRemove} />
            </Route>

            <Route path='/'>
              <Togglable buttonLabel="new blog">
                <CreateForm />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>


        </div>
      }

    </div>
  )
}

export default App