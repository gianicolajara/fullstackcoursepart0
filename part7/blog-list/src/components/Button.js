import React from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.button`
  background-color: #0cf8ff;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #19c1c6;
  }
`
const Button = ({ text, handleCLick, type, id }) => {
  return (
    <ButtonStyle id={id} type={type} onClick={handleCLick}>
      {text}
    </ButtonStyle>
  )
}

export default Button
