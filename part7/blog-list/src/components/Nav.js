import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavStyles = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #a9efff;
`

const Nav = ({ user, logout }) => {
  if (!user) return null

  const navStyles = {}

  return (
    <NavStyles style={navStyles}>
      <div>
        <Link to="/">blogs</Link> | <Link to="/users">users</Link>
      </div>
      <p>{user.name} logged in</p>
      <Button text="logout" handleCLick={logout} id="logout" />
    </NavStyles>
  )
}

export default Nav
