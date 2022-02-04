import React, { useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
/* import { setBlogs } from '../reducers/blogs.reducers' */
import CreateBlogForm from './CreateBlogForm'
import ListBlogs from './ListBlogs'
import Title from './Title'
import Toggeable from './Toggeable'

const Blogs = ({ blogs, user }) => {
  const blogFormRef = useRef()
  // eslint-disable-next-line no-unused-vars
  const [login, logout] = useAuth()

  const toggleClose = () => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleBox()
    }
  }

  return (
    <>
      <Title text="blogs" />
      <ListBlogs blogs={blogs} user={user} />
      <Toggeable textButton="create new blog" ref={blogFormRef}>
        <CreateBlogForm blogs={blogs} toggleClose={toggleClose} />
      </Toggeable>
    </>
  )
}

export default Blogs
