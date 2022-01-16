import React from 'react'
import Country from './Country'

const ListCountries = ({ countries, handleShowButton }) => {
  if (countries.length > 9)
    return <p>Too many matches, specify another filter</p>
  return (
    <>
      {countries.map((item) => (
        <Country
          country={item.name.official}
          handleShowButton={handleShowButton}
          key={item.name.official}
        />
      ))}
    </>
  )
}

export default ListCountries
