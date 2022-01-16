import React from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} style={{ display: 'inline' }}>
      {text}
    </button>
  )
}

export default Button
