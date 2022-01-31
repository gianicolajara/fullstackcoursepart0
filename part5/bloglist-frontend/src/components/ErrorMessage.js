import React from 'react'

const tylesDiv = {
  backgroundColor: 'red',
  color: 'white',
  padding: '1rem',
  borderRadius: '1rem',
}

const ErrorMessage = ({ text }) => {
  if (!text) return null
  if (Array.isArray(text))
    return (
      <div style={tylesDiv} id="error-box">
        {text.map((item) => (
          <li key={item.msg}>{item.msg || 'Error'}</li>
        ))}
      </div>
    )
  return (
    <div style={tylesDiv} id="error-box">
      {text}
    </div>
  )
}

export default ErrorMessage
