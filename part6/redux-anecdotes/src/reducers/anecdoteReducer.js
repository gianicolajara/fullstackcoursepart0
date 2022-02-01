import {
  getAllAnecdotes,
  saveNewAnecdote,
  updateAnecdote,
} from '../services/anecdotes'

const initialState = []

/* const getId = () => (100000 * Math.random()).toFixed(0) */

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  }
}

const vote = (anecdote) => {
  return async (dispatch) => {
    const data = await updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE',
      data,
    })
  }
}

const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const data = await saveNewAnecdote(asObject(anecdote))
    dispatch({ type: 'CREATE', data })
  }
}

const getAllAnecdotesDb = () => {
  return async (dispatch) => {
    const data = await getAllAnecdotes()
    dispatch({
      type: 'GET_ALL_DB_AND_SET_STATE',
      data,
    })
  }
}

const orderAnecdoteByVotes = (anecdotes) =>
  anecdotes.sort((a, b) => b.votes - a.votes)

const reducerAnecdote = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const { id } = action.data

      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 },
      )
    case 'CREATE':
      return [...state, action.data]
    case 'GET_ALL_DB_AND_SET_STATE':
      return [...state, ...action.data]
    default:
      return state
  }
}

export default reducerAnecdote
export { vote, createAnecdote, orderAnecdoteByVotes, getAllAnecdotesDb }
