import React from 'react'
/* import { useDispatch } from 'react-redux' */
import { createAnecdote } from '../reducers/anecdoteReducer'
import { pushNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  /* const dispatch = useDispatch() */

  const createAnecdoteHandle = async (e) => {
    e.preventDefault()
    const anecdoteToCreate = e.target.anecdote.value
    e.target.anecdote.value = ''
    /* dispatch(createAnecdote(anecdoteToCreate)) */
    /* dispatch(pushNotification(`New anecdote: ${anecdoteToCreate}`, 5)) */
    props.createAnecdote(anecdoteToCreate)
    props.pushNotification(`New anecdote: ${anecdoteToCreate}`, 5)
  }

  return (
    <form onSubmit={createAnecdoteHandle}>
      <div>
        <input name="anecdote" type="text" />
      </div>
      <button>create</button>
    </form>
  )
}

export default connect(null, { createAnecdote, pushNotification })(AnecdoteForm)
