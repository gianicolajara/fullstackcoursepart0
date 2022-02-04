import React from 'react'

const CountryDetails = ({ country }) => {
  if (!country.data) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.official} </h3>
      <div>capital {capital} </div>
      <div>population {population}</div>
      <img src={flags.png} height="100" alt={`flag of ${country.data.name}`} />
    </div>
  )
}

export default CountryDetails
