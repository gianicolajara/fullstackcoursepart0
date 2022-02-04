export const useStorage = (variableName) => {
  const setLocalStorageDataHandle = (data) => {
    if (data) {
      window.localStorage.setItem(variableName, JSON.stringify(data))
    }
  }

  const getLocalStorageDataHandle = () => {
    if (window.localStorage.getItem(variableName)) {
      return JSON.parse(window.localStorage.getItem(variableName))
    }
  }

  const deleteLocalStorageHandle = () => {
    if (window.localStorage.getItem(variableName)) {
      window.localStorage.removeItem(variableName)
    }
  }

  return [
    setLocalStorageDataHandle,
    getLocalStorageDataHandle,
    deleteLocalStorageHandle,
  ]
}
