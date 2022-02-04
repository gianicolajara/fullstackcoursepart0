import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogsFromDB } from './reducers/blogs.reducers'
import { setUserHandle } from './reducers/user.reducers'
import { useStorage } from './hooks/useStorage'
import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Nav from './components/Nav'
import { useAuth } from './hooks/useAuth'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import NotFound from './components/NotFound'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const { notification, isError } = useSelector((state) => state.notification)
  // eslint-disable-next-line no-unused-vars
  const [setStorageUser, getStorageUser, deleteStorageUser] = useStorage(
    'tokenUserBlog',
  )
  // eslint-disable-next-line no-unused-vars
  const [login, logout] = useAuth()

  useEffect(() => {
    if (getStorageUser()) {
      dispatch(setUserHandle(getStorageUser()))
      dispatch(getAllBlogsFromDB())
    }
  }, [])

  return (
    <Container>
      <ErrorMessage notification={notification} isError={isError} />
      <Nav user={user} logout={logout} />
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Blogs blogs={blogs} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth redirectTo="/login">
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path="/users/:id"
          element={
            <RequireAuth redirectTo="/login">
              <UserDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <RequireAuth redirectTo="/login">
              <BlogDetails />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}

export default App
