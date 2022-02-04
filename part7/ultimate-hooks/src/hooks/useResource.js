import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAllResources = async () => {
      try {
        const request = await axios.get(baseUrl)
        setResources(request.data)
      } catch (error) {
        console.error(error)
      }
    }
    getAllResources()
  }, [baseUrl])

  const create = async (resource) => {
    const request = await axios.post(baseUrl, resource)
    setResources(resources.concat(request.data))
  }

  const service = {
    create,
  }

  return [resources, service]
}
