import { useState } from 'react'

export const useField = (type, required, id) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear,
    required,
    id,
  }
}
