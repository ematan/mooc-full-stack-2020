import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import PropTypes from 'prop-types'

const LoginForm = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      console.log(token)
      localStorage.setItem('library-user-token', token)
      console.log('jee')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )


}
LoginForm.propTypes = {
  setToken: PropTypes.any,
  setPage: PropTypes.func,
  show: PropTypes.bool
}

export default LoginForm
