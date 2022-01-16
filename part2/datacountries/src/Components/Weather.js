import React from 'react'
import Image from './Image'
import Titleh2 from './Titleh2'

const Weather = ({ weather }) => {
  return (
    <>
      <Titleh2
        text={`Weather in ${weather.location.name || 'City name not found'}`}
      />
      <p>
        <strong>Temperature: </strong>
        {weather.current.temperature || 'Temperature not found'} Celcius
      </p>
      <Image img={weather.current.weather_icons[0]} />
      <p>
        <strong>wind: </strong>
        {weather.current.wind_speed || 'Speed not found'} mph direction{' '}
        {weather.current.wind_dir || 'Direction not found'}
      </p>
    </>
  )
}

export default Weather
