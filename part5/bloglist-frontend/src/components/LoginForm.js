import React, { useState } from 'react'
import { signin } from '../services/auth'
import { setToken } from '../services/blogs'
import {
  getUserTokenOnLocalStorage,
  saveUserOnLocalStorage,
} from '../utils/token'
import Button from './Button'
import Title from './Title'

const initUsername = ''
const initPassword = ''

const LoginForm = ({ setUser, getAllBlogsHandle, setErrorMessage }) => {
  const [username, setUsername] = useState(initUsername)
  const [password, setPassword] = useState(initPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const signinData = await signin(username, password)
      if (signinData) {
        saveUserOnLocalStorage(signinData)
        setUser(signinData)
        setToken(getUserTokenOnLocalStorage())
        await getAllBlogsHandle()
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

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Title text="log in to application" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={handleChangeUsername}
          value={username}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <br />
        <Button id="login-button" type="submit" text="login" />
      </form>
    </>
  )
}

export default LoginForm
