import { setToken } from '../services/blogs'

const initialState = null

const setUserHandle = (data) => {
  return (dispatch) => {
    if (data) {
      setToken(data.token)
      dispatch({
        type: 'SET_USER',
        data,
      })
    }
  }
}

const clearUserHandle = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_USER',
    })
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return initialState
    default:
      return state
  }
}

export { setUserHandle, clearUserHandle }
