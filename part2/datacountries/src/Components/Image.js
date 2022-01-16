import React from 'react'

const Image = ({ img, alt }) => {
  return (
    <img
      src={
        img ||
        'https://catalogue.bticino.com/app/webroot/img/img_not_found_prod_it.jpg'
      }
      alt={alt || 'image'}
    />
  )
}

export default Image
