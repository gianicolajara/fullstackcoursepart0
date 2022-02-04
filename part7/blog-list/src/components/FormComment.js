import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { addCommentBlog } from '../reducers/blogs.reducers'
import Button from './Button'
import styled from 'styled-components'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 5px;
  margin: 0 auto;
`

const InputStyle = styled.textarea`
  border: none;
  padding: 1rem;
`

const FormComment = ({ id, blog }) => {
  const { clear: commentClear, ...comment } = useField('text', true, 'comment')

  const dispatch = useDispatch()

  const handleSubmitComment = (e) => {
    e.preventDefault()
    dispatch(addCommentBlog({ id, comment: comment.value }))
    commentClear()
  }

  return (
    <FormStyle onSubmit={handleSubmitComment}>
      <InputStyle {...comment} />
      <Button text="send comment" />
    </FormStyle>
  )
}

export default FormComment
