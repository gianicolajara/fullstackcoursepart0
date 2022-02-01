import React from 'react'
import { connect /* , useDispatch  */ } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    /* dispatch(setFilter(e.target.value)) */
    props.setFilter(e.target.value)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
