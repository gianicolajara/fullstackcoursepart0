import React from 'react'

let timeout = null

const Notification = ({ message, setMessage, seconds }) => {
  if (!message) return null

  if (!timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    setMessage(null)
  }, seconds * 1000)

  const stylesNotification = {
    padding: '1rem',
    backgroundColor: 'lightgrey',
    borderRadius: '.5rem',
    border: '1px solid green',
    color: 'green',
  }

  return <div style={stylesNotification}>{message}</div>
}

export default Notification
