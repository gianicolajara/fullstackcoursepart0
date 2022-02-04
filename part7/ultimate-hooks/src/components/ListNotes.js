import React from 'react'

const ListNotes = ({ notes }) => {
  if (notes.length === 0 || !notes) return <p>there are no notes to show</p>
  return (
    <>
      <h2>notes</h2>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
    </>
  )
}

export default ListNotes
