import { useDispatch } from 'react-redux'
import { getAllBlogsFromDB } from '../reducers/blogs.reducers'
import {
  clearNotification,
  setNotification,
} from '../reducers/notification.reducers'
import { clearUserHandle, setUserHandle } from '../reducers/user.reducers'
import { signin } from '../services/auth'
import { setToken } from '../services/blogs'
import { useStorage } from './useStorage'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const [
    // eslint-disable-next-line no-unused-vars
    setLocalStorageTokenUser,
    getLocalStorageTokenUser,
    deleteLocalStorageHandle,
  ] = useStorage('tokenUserBlog')

  const login = async (userValue, passwordValue) => {
    let signinData = await signin(userValue, passwordValue)
    if (signinData) {
      signinData = {
        ...signinData,
        token: `Bearer ${signinData.token}`,
      }
      setLocalStorageTokenUser(signinData)
      setToken(getLocalStorageTokenUser())
      dispatch(setUserHandle(signinData))
      dispatch(getAllBlogsFromDB())
    }
  }

  const logout = () => {
    if (getLocalStorageTokenUser()) {
      deleteLocalStorageHandle()
      dispatch(clearUserHandle())
      setToken('')
      navigator('/login')
    }
  }

  return [login, logout]
}
