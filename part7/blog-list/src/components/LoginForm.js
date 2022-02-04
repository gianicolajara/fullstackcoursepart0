import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import { useField } from '../hooks/useField'
import {
  clearNotification,
  setNotification,
} from '../reducers/notification.reducers'
import Button from './Button'
import Title from './Title'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

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

const LoginForm = () => {
  const dispatch = useDispatch()
  const [login] = useAuth()
  const navigator = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const { clear: clearUsername, ...username } = useField(
    'text',
    true,
    'username',
  )
  // eslint-disable-next-line no-unused-vars
  const { clear: clearPassword, ...password } = useField(
    'password',
    true,
    'password',
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username.value, password.value)
      navigator('/blogs')
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <Title text="log in to application" />
        <label htmlFor="username">Username</label>
        <InputStyle {...username} />
        <br />
        <label htmlFor="password">Password</label>
        <InputStyle {...password} />
        <br />
        <Button id="login-button" type="submit" text="login" />
      </FormStyle>
    </>
  )
}

export default LoginForm
