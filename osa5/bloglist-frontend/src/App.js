import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'
import './App.css'

const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div className={`notification ${message.color}`}>
      {message.msg}
    </div>
  )
}
Notification.propTypes = {
  message: PropTypes.object
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    userService.getAll().then(users =>
      setUsers( users ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('Testing login with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        msg:'Wrong username or password',
        color: 'red'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleCreateSubmit = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage({
          msg:`Added new blog ${returnedBlog.title} by ${returnedBlog.author}`,
          color: 'green'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage({
          msg: error.response.data.error,
          color: 'red'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        returnedBlog.user = users.find(user => returnedBlog.user === user.id)
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
      })
      .catch(error => console.log(error))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirmed){
      //console.log('agree')
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setErrorMessage({
            msg: `${blog.title} succesfully removed`,
            color: 'green'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => console.log(error))
    }
  }

  const LogOut = () => (
    <button onClick={handleLogout}>logout</button>
  )

  return (
    <div>


      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />

          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        :
        <div>
          <h2>Blogs</h2>
          <Notification message={errorMessage} />

          <p>Hello {user.name} <LogOut /></p>
          <Togglable buttonLabel="new blog">
            <CreateForm
              createBlog={handleCreateSubmit}
            />
          </Togglable>
          <h2>Blogs on server:</h2>
          <div id='blogList'>
            {blogs
              .sort((a,b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  user={user}
                  blog={blog}
                  handleLikes={handleLikes}
                  handleRemove={handleRemove}
                />
              )
            }
          </div>
        </div>
      }

    </div>
  )
}

export default App