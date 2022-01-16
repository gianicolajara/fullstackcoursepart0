import React from 'react'
import Button from './Button'

const Country = ({ country, handleShowButton }) => {
  return (
    <li>
      {country}{' '}
      <Button text="show" handleClick={() => handleShowButton(country)} />
    </li>
  )
}

export default Country
