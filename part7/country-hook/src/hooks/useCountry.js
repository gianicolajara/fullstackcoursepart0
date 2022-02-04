import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [data, setData] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const request = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`,
        )
        setData(request.data[0])
        setFound(true)
      } catch (error) {
        setFound(false)
        setData('not found')
      }
    }
    name && fetchCountry()
  }, [name])

  return {
    data,
    found,
  }
}
