import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import SucessMessage from './components/SucessMessage'
import { getAllBlogs, putBlog, setToken } from './services/blogs'

const initialUser = null
const initialBlogs = []
const initilaErrorMessage = null
const initialSucessMessage = null

const App = () => {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [user, setUser] = useState(initialUser)
  const [errorMessage, setErrorMessage] = useState(initilaErrorMessage)
  const [sucessMessage, setSucessMessage] = useState(initialSucessMessage)

  const getAllBlogsHandle = async () => {
    try {
      const blogs = await getAllBlogs()
      if (blogs) {
        setBlogs(blogs)
      }
    } catch (error) {
      if (error.response['data']) {
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

  const handleClickLike = async (blog) => {
    try {
      const dataToSend = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      }

      const request = await putBlog(blog.id, dataToSend)

      setBlogs(
        blogs.map((item) =>
          item.id === blog.id ? { ...item, likes: request.likes } : item,
        ),
      )
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

  useEffect(() => {
    const getDataUserHandle = async () => {
      const getDataUser = window.localStorage.getItem('tokenUserBlog')
      if (getDataUser) {
        const dataUser = JSON.parse(getDataUser)
        setUser(dataUser)
        setToken(dataUser.token)
        await getAllBlogsHandle()
      }
    }
    getDataUserHandle()
  }, [])

  const closeSession = async () => {
    if (window.localStorage.getItem('tokenUserBlog')) {
      window.localStorage.removeItem('tokenUserBlog')
      setUser(initialUser)
      setBlogs(initialBlogs)
    }
  }

  return (
    <div>
      <ErrorMessage text={errorMessage} />
      <SucessMessage text={sucessMessage} />
      {user === null ? (
        <LoginForm
          setUser={setUser}
          getAllBlogsHandle={getAllBlogsHandle}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          handleCloseSession={closeSession}
          setSucessMessage={setSucessMessage}
          setErrorMessage={setErrorMessage}
          handleClickLike={handleClickLike}
        />
      )}
    </div>
  )
}

export default App
