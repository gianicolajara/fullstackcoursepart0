import React from 'react'
import { useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notification.reducers'
import styled from 'styled-components'

let timeout = null

const ErrorMessageStyle = styled.div`
  background-color: ${(props) => (props.isError ? 'red' : 'green')};
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
`

const ErrorMessage = ({ notification, isError }) => {
  const dispatch = useDispatch()

  const tylesDiv = {
    backgroundColor: isError ? 'red' : 'green',
    color: 'white',
    padding: '1rem',
    borderRadius: '1rem',
  }

  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    timeout = null
    dispatch(clearNotification())
  }, 5000)

  if (!notification) return null
  if (Array.isArray(notification))
    return (
      <ErrorMessageStyle isError={isError} id="error-box">
        {notification.map((item) => (
          <li key={item.msg}>{item.msg || 'Error'}</li>
        ))}
      </ErrorMessageStyle>
    )
  return (
    <ErrorMessageStyle isError={isError} id="error-box">
      {notification}
    </ErrorMessageStyle>
  )
}

export default ErrorMessage
