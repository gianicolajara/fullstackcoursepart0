import React from 'react'
import Button from './Button'

const CreateBlogForm = ({
  handleCreateBlog,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url,
}) => {
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleChangeUrl = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleCreateBlog()
  }

  return (
    <form onSubmit={handleSubmit} id="create-blog-form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={handleChangeTitle}
        value={title}
        required
      />
      <br />
      <label htmlFor="title">Author</label>
      <input
        type="text"
        id="author"
        onChange={handleChangeAuthor}
        value={author}
        required
      />
      <br />
      <label htmlFor="url">URL</label>
      <input
        type="url"
        id="url"
        onChange={handleChangeUrl}
        value={url}
        required
      />
      <br />
      <Button type="submit" text="create blog" id="create-blog" />
    </form>
  )
}

export default CreateBlogForm
