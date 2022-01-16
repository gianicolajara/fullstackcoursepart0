import React from 'react'
import Image from './Image'
import ListLanguagesCountry from './ListLanguagesCountry'
import Title from './Title'
import Titleh2 from './Titleh2'

const CountryInfo = ({ country }) => {
  return (
    <>
      <Title text={country.name.official || 'Name of country dont exist'} />
      <p>capital {country.capital || 'Capital of country dont exist'}</p>
      <p>
        Population {country.population || 'Population of country dont exist'}
      </p>
      <Titleh2 text="languages" />
      {Object.values(country.languages).map((item) => (
        <ListLanguagesCountry language={item} key={item} />
      ))}

      <Image img={country.flags.png} alt={country.name.official} />
    </>
  )
}

export default CountryInfo
