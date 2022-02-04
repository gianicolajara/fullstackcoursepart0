import React from 'react'

const ListPersons = ({ persons }) => {
  if (persons.length === 0 || !persons)
    return <p>there are no persons to show</p>
  return (
    <>
      <h2>persons</h2>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </>
  )
}

export default ListPersons
