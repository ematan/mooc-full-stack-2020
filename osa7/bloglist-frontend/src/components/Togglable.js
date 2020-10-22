import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outline-dark" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline-dark" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Togglable