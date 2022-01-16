import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((item) => (
        <Course course={item} key={item.id} />
      ))}
    </>
  )
}

export default Courses
