import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const menuStyle = {
    display: 'flex',
    gap: '.5rem',
  }
  return (
    <div style={menuStyle}>
      {/* <a href="#" style={padding}>
        anecdotes
      </a>
      <a href="#" style={padding}>
        create new
      </a>
      <a href="#" style={padding}>
        about
      </a> */}
      <Link to="/">anecdotes</Link>
      <Link to="/createNew">create new</Link>
      <Link to="/about">about</Link>
    </div>
  )
}

export default Menu
