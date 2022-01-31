import React from 'react'

const tylesDiv = {
  backgroundColor: 'green',
  color: 'white',
  padding: '1rem',
  borderRadius: '1rem',
}

const SucessMessage = ({ text }) => {
  if (!text) return null
  return <div style={tylesDiv}>{text}</div>
}

export default SucessMessage
