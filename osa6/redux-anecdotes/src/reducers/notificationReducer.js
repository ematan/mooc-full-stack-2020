const initialState = 'hello'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timer = null

export const setNotification = (notification, sec) => {
  return async dispatch => {
    if (timer) clearTimeout(timer)
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => dispatch(clearNotification()), sec*1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}



export default notificationReducer