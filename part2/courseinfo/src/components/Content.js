import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item) => (
        <Part part={item.name} exercise={item.exercises} key={item.name} />
      ))}
    </>
  )
}

export default Content
