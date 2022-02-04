import React from 'react'
import { Navigate } from 'react-router-dom'
import { useStorage } from '../hooks/useStorage'

const RequireAuth = ({ children, redirectTo }) => {
  // eslint-disable-next-line no-unused-vars
  const [setStorageUser, getStorageUser, deleteStorageUser] = useStorage(
    'tokenUserBlog',
  )

  return getStorageUser() ? children : <Navigate to={redirectTo} />
}

export default RequireAuth
