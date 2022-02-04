import React from 'react'
import { useField } from '../hooks/useField'

const FormPersons = ({ personService }) => {
  const { clear: clearName, ...name } = useField('text')
  const { clear: clearNumber, ...number } = useField('text')

  const handlePersonSubmit = async (e) => {
    e.preventDefault()
    await personService.create({ name: name.value, number: number.value })
    clearName()
    clearNumber()
  }

  return (
    <form onSubmit={handlePersonSubmit}>
      name <input {...name} /> <br />
      number <input {...number} />
      <button>create</button>
    </form>
  )
}

export default FormPersons
