import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const LOCAL_STORAGE_KEY = 'loggedBlogappUser'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const storeToken = (user) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY, JSON.stringify(user)
  )
  blogService.setToken(user.token)
}

export const login = (creds) => {
  return async dispatch => {
    try {
      const user = await loginService.login(creds)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      storeToken(user)
      dispatch(setNotification({ msg: `Hi ${user.name}`, color:'success' },5))

    } catch (e) {
      let msg = 'Something went wrong'
      if (e.response.status === 401){
        msg = 'Wrong username or password'
      }
      dispatch(setNotification({ msg: msg, color:'danger' },5))
    }
  }
}

export const checkTokenForLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      storeToken(user)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
  return { type:'LOGOUT' }
}


export default reducer