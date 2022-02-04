import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { createNewBlog } from '../reducers/blogs.reducers'
import Button from './Button'
import styled from 'styled-components'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 5px;
  margin: 0 auto;
`

const InputStyle = styled.input`
  border: none;
  padding: 1rem;
`

const CreateBlogForm = ({ toggleClose }) => {
  // eslint-disable-next-line no-unused-vars
  const { clear: clearTitle, ...title } = useField('text', true, 'title')
  // eslint-disable-next-line no-unused-vars
  const { clear: clearAuthor, ...author } = useField('text', true, 'author')
  // eslint-disable-next-line no-unused-vars
  const { clear: clearUrl, ...url } = useField('text', true, 'url')

  const dispatch = useDispatch()

  const clearAll = () => {
    clearTitle()
    clearAuthor()
    clearUrl()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSend = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createNewBlog(dataToSend, toggleClose, clearAll))
  }

  return (
    <FormStyle onSubmit={handleSubmit} id="create-blog-form">
      <label htmlFor="title">Title</label>
      <InputStyle {...title} />
      <br />
      <label htmlFor="title">Author</label>
      <InputStyle {...author} />
      <br />
      <label htmlFor="url">URL</label>
      <InputStyle {...url} />
      <br />
      <Button type="submit" text="create blog" id="create-blog" />
    </FormStyle>
  )
}

export default CreateBlogForm
