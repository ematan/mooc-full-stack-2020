import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message || !message.msg) return null
  return (
    <div className={`notification ${message.color}`}>
      {message.msg}
    </div>
  )
}


export default Notification