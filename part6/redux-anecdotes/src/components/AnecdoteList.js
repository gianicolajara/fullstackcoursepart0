import React from 'react'
/* import { useDispatch, useSelector } from 'react-redux' */
import { /* orderAnecdoteByVotes, */ vote } from '../reducers/anecdoteReducer'
import { pushNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  /* const dispatch = useDispatch() */
  /* const anecdotes = useSelector((state) => {
    if (state.filter) {
      return orderAnecdoteByVotes(
        state.anecdote.filter((item) =>
          item.content.toLowerCase().includes(state.filter.toLowerCase()),
        ),
      )
    }
    return orderAnecdoteByVotes(state.anecdote)
  }) */

  const voteHandle = (anecdote) => {
    props.vote(anecdote)
    props.pushNotification(`You voted for: ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandle(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
/* 
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  }
} */

const anecdotesToProps = (state) => {
  if (!state.filter) {
    return {
      anecdote: state.anecdote.sort((a, b) => b.votes - a.votes),
    }
  }
  return {
    anecdote: state.anecdote
      .filter((item) =>
        item.content.toLowerCase().includes(state.filter.toLowerCase()),
      )
      .sort((a, b) => b.votes - a.votes),
  }
}

const mapDispatchToProps = {
  vote,
  pushNotification,
}

const ConnectedNotes = connect(
  anecdotesToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default ConnectedNotes
