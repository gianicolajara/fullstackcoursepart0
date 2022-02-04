import React from 'react'
import { useField } from '../hooks/useField'

const FormCreateAnecdote = ({ addNew }) => {
  const { clear: clearContent, ...contentField } = useField('text')
  const { clear: clearAuthor, ...authorField } = useField('text')
  const { clear: clearInfo, ...infoField } = useField('text')

  const handleClear = () => {
    clearContent()
    clearAuthor()
    clearInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    })
    handleClear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={contentField.value}
            onChange={(e) => contentField.setValue(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={authorField.value}
            onChange={(e) => authorField.setValue(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={infoField.value}
            onChange={(e) => infoField.setValue(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleClear}>
          reset
        </button>
      </form>
    </div>
  )
}

export default FormCreateAnecdote
