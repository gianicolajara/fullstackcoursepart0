import React from 'react'

const AnecdoteDetails = ({ anecdote }) => {
  if (anecdote === undefined || !anecdote) return <h2>Anecdote not found</h2>
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </>
  )
}

export default AnecdoteDetails
