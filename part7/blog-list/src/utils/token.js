const setTokenInUserData = (user) => {
  return { ...user, token: `Bearer ${user.token}` }
}

export { setTokenInUserData }
