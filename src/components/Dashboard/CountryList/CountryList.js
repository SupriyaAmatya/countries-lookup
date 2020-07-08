import React from 'react'
import Numeral from 'numeral'
import { Link } from 'react-router-dom';

const CountryList = (props) => {
  const { filteredCountries, allCountries} = props
  // text.filter(info => roleFilter ? info.role.includes(roleFilter) : true) 
  const countryList = allCountries.length > 0 ?
    (filteredCountries.length !== 0 ? (
      filteredCountries.map(item => {
        return (
          <div className="col col-4" key={item.alpha2Code}>

            <div className="card">
              <Link to={`/${item.name}`} className="card">
                <div className="card__image" style={{ backgroundImage: `url(${item.flag})` }}>
                </div>
                <div className="card__content">
                  <div className="card-title">
                    <h2>{item.name}</h2>
                  </div>
                  <div className="card-body">
                    <p>Population : <span>{Numeral(item.population).format(0, 0)}</span></p>
                    <p>Region : <span>{item.region}</span></p>
                    <p>Capital : <span>{item.capital}</span></p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })
    ) :
      (
        <p className="error">
          Oops, wrong country name
          <br />
           Please search again
        </p>
      )

    ) : null

  return (
    <div className="row">
      {countryList}
    </div>
  )
}

export default CountryList
