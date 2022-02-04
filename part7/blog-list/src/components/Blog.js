import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogStyle = styled.div`
  padding: 1rem;
  margin: 1rem;
  background-color: #a9efff;
`

const Blog = ({ blog /* , user */ }) => {
  return (
    <BlogStyle className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </BlogStyle>
  )
}

export default Blog
