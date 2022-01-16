import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListCountries from './Components/ListCountries'
import FormFindCountries from './Components/FormFindCountries'
import CountryInfo from './Components/CountryInfo'
import Weather from './Components/Weather'

const initCountries = []
const initialFindTextCountry = ''
const initialFilterCountry = []
const initialWeather = {}
const apiKey = process.env.REACT_APP_API_KEY

function App() {
  const [countries, setCountries] = useState(initCountries)
  const [findTextCountry, setFindTextCountry] = useState(initialFindTextCountry)
  const [filterCountry, setFilterCountry] = useState(initialFilterCountry)
  const [weather, setWeather] = useState(initialWeather)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          setCountries(res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    setFilterCountry(
      findTextCountry.length > 0
        ? countries.filter((item) =>
            item.name.official
              .toLowerCase()
              .includes(findTextCountry.toLocaleLowerCase()),
          )
        : [],
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextCountry])

  useEffect(() => {
    if (filterCountry.length === 1) {
      const weatherPage = 'http://api.weatherstack.com'
      const accessKeyWeather = `current?access_key=${apiKey}`
      const queryWeather = `query=${filterCountry[0].capital}`
      const url = `${weatherPage}/${accessKeyWeather}&${queryWeather}`
      axios
        .get(url)
        .then((res) => {
          if (res.status === 200 && res.statusText) {
            setWeather(res.data)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [filterCountry])

  const handleShowButton = (country) => {
    setFindTextCountry(country)
  }

  if (countries.length === 0) return 'loading...'

  return (
    <div>
      <FormFindCountries
        findTextCountry={findTextCountry}
        setFindTextCountry={setFindTextCountry}
      />

      {filterCountry.length > 1 && (
        <ListCountries
          countries={filterCountry}
          handleShowButton={handleShowButton}
        />
      )}

      {filterCountry.length === 1 && <CountryInfo country={filterCountry[0]} />}

      {Object.keys(weather).length > 0 && filterCountry.length === 1 && (
        <Weather weather={weather} />
      )}

      {filterCountry.length === 0 && 'not found country'}
    </div>
  )
}

export default App
