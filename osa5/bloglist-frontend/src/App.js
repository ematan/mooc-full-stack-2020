import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import './App.css'

const Notification = ({message}) => {
  if (!message) return null
  return (
    <div className={`notification ${message.color}`}>
      {message.msg}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
    console.log('Testing login with', username, password)

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
      console.log(exception)
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

  const handleCreateSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
          setErrorMessage({
            msg:`Added new blog ${returnedBlog.title} by ${returnedBlog.author}`,
            color: 'green'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          //console.log("Error msg:",error.response.data.error)
          setErrorMessage({
            msg: error.response.data.error,
            color: 'red'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } catch (exception) {
      console.log(exception)
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
          <CreateForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)}
            handleSubmit={handleCreateSubmit}
          />
          <h2>Blogs on server:</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App