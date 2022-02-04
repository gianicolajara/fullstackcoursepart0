import React from 'react'
import ListNotes from './components/ListNotes'
import FormNotes from './components/FormNotes'
import ListPersons from './components/ListPersons'
import FormPersons from './components/FormPersons'
import { useResource } from './hooks/useResource'

const App = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  return (
    <div>
      <ListNotes notes={notes} />
      <FormNotes noteService={noteService} />
      <ListPersons persons={persons} />
      <FormPersons personService={personService} />
    </div>
  )
}

export default App
