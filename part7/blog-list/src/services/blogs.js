import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = async (newToken) => (token = newToken)

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (data) => {
  const request = await axios.post(baseUrl, data, {
    headers: { Authorization: token },
  })
  return request.data
}

const putBlog = async (id, data) => {
  const request = await axios.put(`${baseUrl}/${id}`, data, {
    headers: { Authorization: token },
  })
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })
  return request.data
}

const getBlogById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createCommentById = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.data
}

export {
  getAllBlogs,
  setToken,
  createBlog,
  putBlog,
  deleteBlog,
  getBlogById,
  createCommentById,
}
