const initialState = {
  notification: null,
  isError: true,
}

const setNotification = (message, isError = true) => {
  return async (dispatch) => {
    if (message.response && message.response['data'] && isError) {
      if (message.response['data'].error) {
        dispatch({
          type: 'SET_NOTIFICATION',
          data: { notification: message.response['data'].error, isError },
        })
      } else {
        dispatch({
          type: 'SET_NOTIFICATION',
          data: { notification: message.response['data'], isError },
        })
      }
    } else {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: message.message || message, isError },
      })
    }
  }
}

const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    })
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        notification: action.data.notification,
        isError: action.data.isError,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export { setNotification, clearNotification }
