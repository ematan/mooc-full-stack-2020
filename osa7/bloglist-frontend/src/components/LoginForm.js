import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username, password
    }
    dispatch(login(credentials))
    setUsername('')
    setPassword('')
  }

  return(
    <Container>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="outline-dark" id='login-button' type='submit'>login</Button>
      </Form>
    </Container>
  )
}

export default LoginForm