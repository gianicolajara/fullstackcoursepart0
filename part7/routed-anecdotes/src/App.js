import React, { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import About from './components/About'
import AnecdoteDetails from './components/AnecdoteDetails'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import FormCreateAnecdote from './components/FormCreateAnecdote'
import Menu from './components/Menu'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])

  const navigate = useNavigate()

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`a new anecdote ${anecdote.content} created!`)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  /*   const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  } */

  const match = useMatch('/anecdote/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification
        message={notification}
        setMessage={setNotification}
        seconds={5}
      />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/createNew"
          element={<FormCreateAnecdote addNew={addNew} />}
        />
        <Route
          path="/anecdote/:id"
          element={<AnecdoteDetails anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
