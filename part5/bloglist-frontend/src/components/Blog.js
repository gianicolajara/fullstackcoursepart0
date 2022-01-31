import React, { useState } from 'react'
import { deleteBlog } from '../services/blogs'
import Button from './Button'

const initialIsOpen = false

const Blog = ({
  blog,
  setErrorMessage,
  blogs,
  setBlogs,
  user,
  handleClickLike,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  const showIsOpen = { display: isOpen ? '' : 'none' }

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const handleDeleteBlog = async () => {
    try {
      const answer = window.confirm(
        `Are you sure you want to delete ${blog.title}?`,
      )
      if (answer) {
        await deleteBlog(blog.id)
        setBlogs(blogs.filter((item) => item.id !== blog.id))
      }
    } catch (error) {
      if (error.response && error.response['data']) {
        if (error.response['data'].error) {
          setErrorMessage(error.response['data'].error)
        } else {
          setErrorMessage(error.response['data'])
        }
      } else {
        setErrorMessage(error.message)
      }
    }
  }

  const stylesBlog = {
    border: '1px solid gray',
    padding: '1rem',
    margin: '1rem',
    boxShadow: '1px 1px 5px gray',
    backgroundColor: 'black',
    color: 'white',
  }

  return (
    <div style={stylesBlog} className="blog">
      <div className="viewContent">
        {blog.title} <br /> {blog.author} <br />
        <Button
          text={isOpen ? 'hidden' : 'show blog'}
          handleCLick={toggleIsOpen}
        />
      </div>
      <div style={showIsOpen} className="hiddenContent">
        <p id="likes" style={{ display: 'inline-block' }}>
          {blog.likes}
        </p>
        <Button
          text="like"
          handleCLick={() => {
            handleClickLike(blog)
          }}
        />{' '}
        <br /> {blog.url} <br />
        {user.username === blog.user[0].username && (
          <Button text="delete" handleCLick={handleDeleteBlog} />
        )}
      </div>
    </div>
  )
}

export default Blog
