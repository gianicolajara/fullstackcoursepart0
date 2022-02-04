import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  clearNotification,
  setNotification,
} from '../reducers/notification.reducers'
import { getUserById } from '../services/users'

const initialUser = null

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(initialUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserByIdHandle = async () => {
      if (id) {
        try {
          const data = await getUserById(id)
          setUser(data)
        } catch (error) {
          dispatch(clearNotification())
          dispatch(setNotification(error))
        }
      }
    }
    getUserByIdHandle()
  }, [])

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.length > 0 ? (
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
        ) : (
          <li>No blogs added</li>
        )}
      </ul>
    </>
  )
}

export default UserDetails
