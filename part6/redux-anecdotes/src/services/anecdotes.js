import axios from 'axios'

const getAllAnecdotes = async () => {
  const request = await axios.get('http://localhost:3001/anecdotes')
  return request.data
}

const saveNewAnecdote = async (content) => {
  const request = await axios.post('http://localhost:3001/anecdotes', content)
  return request.data
}

const updateAnecdote = async (id, update) => {
  const request = await axios.put(
    `http://localhost:3001/anecdotes/${id}`,
    update,
  )

  return request.data
}

export { getAllAnecdotes, saveNewAnecdote, updateAnecdote }
