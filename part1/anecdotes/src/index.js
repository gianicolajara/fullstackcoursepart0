import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>
}

const Anecdote = ({ title, text, points }) => {
  return (
    <>
      <Title text={title} />
      <p>{text}</p>
      <p>has {points} points</p>
    </>
  )
}

const initVote = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(initVote)

  const handleSelected = () =>
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0) + 0))

  const handleVote = () => {
    setVote({
      ...vote,
      [selected]: vote[selected] + 1,
    })
  }

  const maxAnecdoteVoteIndex = () => {
    const item = Math.max(...Object.values(vote))
    return Object.values(vote).indexOf(item)
  }

  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        text={anecdotes[selected]}
        points={vote[selected]}
      />
      <Button name="vote" handleClick={handleVote} />
      <Button name="next anecdote" handleClick={handleSelected} />
      <Anecdote
        title="Anecdote with most votes"
        text={anecdotes[maxAnecdoteVoteIndex()]}
        points={vote[maxAnecdoteVoteIndex()]}
      />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
