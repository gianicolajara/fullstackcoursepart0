import React from 'react'
import { useField } from '../hooks/useField'

const FormNotes = ({ noteService }) => {
  const { clear: clearContent, ...content } = useField('text')

  const handleNoteSubmit = async (e) => {
    e.preventDefault()
    await noteService.create({ content: content.value })
    clearContent()
  }

  return (
    <form onSubmit={handleNoteSubmit}>
      <input {...content} />
      <button>create</button>
    </form>
  )
}

export default FormNotes
