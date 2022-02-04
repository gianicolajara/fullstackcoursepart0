import React, { forwardRef, useState, useImperativeHandle } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const initialIsOpen = false

const Toggeable = forwardRef(({ children, textButton }, ref) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  const toggleBox = () => setIsOpen(!isOpen)

  const showIsOpen = { display: isOpen ? 'block' : 'none' }
  const showIsClose = { display: isOpen ? 'none' : 'block' }

  useImperativeHandle(ref, () => {
    return {
      toggleBox,
    }
  })

  return (
    <>
      <div style={showIsClose}>
        <Button text={textButton} handleCLick={toggleBox} />
      </div>
      <div style={showIsOpen}>
        {children}
        <Button text="Close" handleCLick={toggleBox} />
      </div>
    </>
  )
})

Toggeable.displayName = 'Toggeable'

Toggeable.propTypes = {
  children: PropTypes.node.isRequired,
  textButton: PropTypes.string.isRequired,
}

export default Toggeable
