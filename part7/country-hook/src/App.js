import React, { useState } from 'react'
import CountryDetails from './components/CountryDetails'
import { useCountry } from './hooks/useCountry'
import { useField } from './hooks/useField'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null)
  const country = useCountry(name)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <CountryDetails country={country} />
    </div>
  )
}

export default App
