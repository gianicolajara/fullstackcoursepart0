const initialState = null
let timeout = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PUSH_NOTIFICATION':
      return action.data
    case 'DELETE_NOTIFICATION':
      return null
    default:
      return state
  }
}

const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
    data: null,
  }
}

const pushNotification = (message, seconds) => {
  return async (dispatch) => {
    if (timeout) clearTimeout(timeout)
    dispatch({
      type: 'PUSH_NOTIFICATION',
      data: message,
    })
    timeout = setTimeout(() => dispatch(deleteNotification()), seconds * 1000)
  }
}

export default notificationReducer
export { pushNotification }
