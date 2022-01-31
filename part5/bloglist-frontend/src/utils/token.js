const saveUserOnLocalStorage = (user) => {
  const dataToSave = { ...user, token: `Bearer ${user.token}` }
  window.localStorage.setItem('tokenUserBlog', JSON.stringify(dataToSave))
}

const getUserTokenOnLocalStorage = () => {
  if (window.localStorage.getItem('tokenUserBlog')) {
    const token = window.localStorage.getItem('tokenUserBlog')
    return JSON.parse(token).token
  }
  return { token: '' }
}

export { saveUserOnLocalStorage, getUserTokenOnLocalStorage }
