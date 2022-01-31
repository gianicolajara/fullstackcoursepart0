import axios from 'axios'

const baseUrl = '/api/auth'

const signin = async (username, password) => {
  const request = await axios.post(`${baseUrl}/signin`, {
    username,
    password,
  })
  return request.data
}

export { signin }
