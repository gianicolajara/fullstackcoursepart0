import React, { useRef, useState } from 'react'
import { createBlog } from '../services/blogs'
import Button from './Button'
import CreateBlogForm from './CreateBlogForm'
import ListBlogs from './ListBlogs'
import Title from './Title'
import Toggeable from './Toggeable'

const initialTitle = ''
const initialUrl = ''
const initialAuthor = ''

const Blogs = ({
  blogs,
  user,
  handleCloseSession,
  setBlogs,
  setSucessMessage,
  setErrorMessage,
  handleClickLike,
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [url, setUrl] = useState(initialUrl)
  const [author, setAuthor] = useState(initialAuthor)

  const blogFormRef = useRef()

  const toggleClose = () => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleBox()
    }
  }

  const handleCreateBlog = async () => {
    try {
      const request = await createBlog({ title, url, author })

      setTitle(initialTitle)
      setUrl(initialUrl)
      setAuthor(initialAuthor)

      if (request) {
        setBlogs([...blogs, request])
        setSucessMessage(`Your blog was successfully created by ${author}`)

        setTimeout(() => {
          setSucessMessage(null)
        }, 5000)
        toggleClose()
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

  return (
    <>
      <Title text="blogs" />
      <p>{user.name} logged in</p>
      <ListBlogs
        blogs={blogs}
        setErrorMessage={setErrorMessage}
        setBlogs={setBlogs}
        user={user}
        handleClickLike={handleClickLike}
      />
      <Button text="logout" handleCLick={handleCloseSession} id="logout" />
      <Toggeable textButton="create new blog" ref={blogFormRef}>
        <CreateBlogForm
          blogs={blogs}
          handleCreateBlog={handleCreateBlog}
          toggleClose={toggleClose}
          setBlogs={setBlogs}
          setSucessMessage={setSucessMessage}
          setErrorMessage={setErrorMessage}
          setTitle={setTitle}
          title={title}
          setAuthor={setAuthor}
          author={author}
          setUrl={setUrl}
          url={url}
        />
      </Toggeable>
    </>
  )
}

export default Blogs
