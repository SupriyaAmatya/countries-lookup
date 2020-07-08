import React from 'react'
import { Link} from 'react-router-dom'

const Border = (props) => {
  const { getCountryNameByCode, borderCountriesCode } = props

  const borderList = borderCountriesCode ? borderCountriesCode.map(code => {
    const countryName = getCountryNameByCode(code);
    return (
        <Link exact="true" to={`/${countryName}`} key={code} className="btn">
          {countryName}
        </Link>
    )
  }) : null

  return (
    borderCountriesCode && borderCountriesCode.length > 0 ? (
      <div className="border__container">
        <h3>Border Countries: </h3>
        <div className='border-countries--list'>
          {borderList}
        </div>
      </div>
    ) : null
  )
}

export default Border


