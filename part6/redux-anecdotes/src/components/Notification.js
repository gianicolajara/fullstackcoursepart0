import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    border: '1px solid green',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'lightgreen',
    borderRadius: '1rem',
    color: 'green',
  }
  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
