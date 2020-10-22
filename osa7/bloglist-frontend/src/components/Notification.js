import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message || !message.msg) return null
  //className={`notification ${message.color}`}
  return (
    <Alert variant={message.color}>
      {message.msg}
    </Alert>
  )
}


export default Notification