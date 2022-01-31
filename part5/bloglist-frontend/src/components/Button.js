import React from 'react'

const Button = ({ text, handleCLick, type, id }) => {
  return (
    <button id={id} type={type} onClick={handleCLick}>
      {text}
    </button>
  )
}

export default Button
