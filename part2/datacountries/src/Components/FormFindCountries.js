import React from 'react'

const FormFindCountries = ({ findTextCountry, setFindTextCountry }) => {
  const handleChangeFindTextCountry = (e) => {
    setFindTextCountry(e.target.value)
  }

  return (
    <form>
      <label htmlFor="country">find countries</label>
      <input
        id="country"
        type="text"
        value={findTextCountry}
        onChange={handleChangeFindTextCountry}
      />
    </form>
  )
}

export default FormFindCountries
