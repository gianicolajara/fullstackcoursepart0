import React from 'react'

const Total = ({ total }) => {
  const calcsTotal = () =>
    total.reduce((prev, actual) => prev + actual.exercises, 0)

  return <b>total of {calcsTotal()} exercises</b>
}

export default Total
