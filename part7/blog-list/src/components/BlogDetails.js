import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, likeBlog } from '../reducers/blogs.reducers'
import Button from './Button'
import FormComment from './FormComment'
import styled from 'styled-components'

const LiStyled = styled.li`
  list-style: none;
  margin: 0.5rem;
  padding: 1rem;
  background-color: #f3f3f3;
`

const UlStyled = styled.ul`
  padding: 0;
`

const BlogDetails = () => {
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )

  const dispatch = useDispatch()

  const handleClickLike = () => {
    dispatch(likeBlog(blog))
  }

  if (!blog) return null

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <Button text="like" handleCLick={handleClickLike} />
      </p>
      <p>added by {blog.author}</p>
      <FormComment id={id} blog={blog} />
      <h3>Comments</h3>
      <UlStyled>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <LiStyled key={comment}>{comment}</LiStyled>
          ))
        ) : (
          <p>there are no comments</p>
        )}
      </UlStyled>
    </div>
  )
}

export default BlogDetails
