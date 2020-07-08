import React, { Component } from 'react'
import Axios from 'axios';
import Numeral from 'numeral'
import Border from './Border';

class CountryDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countryDetails: []
    }
  }

  fetchCountryDetails = () => {
    Axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        const tempCountryDetails = res.data.find(country =>
          country.name === this.props.match.params.countryName);

        if (tempCountryDetails) {
          this.setState(() => ({
            countryDetails: tempCountryDetails
          }));
        } else {
          this.setState(() => ({
            countryDetails: []
          }))
        }
      })
      .catch(error => console.log(error));

  }

  getCountryNameByCode = (code) => {
    const country = this.props.allCountries.find(country => country.alpha3Code === code);
    const countryName = country ? country.name : code;
    return countryName;
  }

  goBack = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    //setting the title of the document
    document.title = this.props.match.params.countryName;

    //getting the data for the current country
    this.fetchCountryDetails();

  }

  componentDidUpdate(prevProps) {
    document.title = this.props.match.params.countryName;
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchCountryDetails();
    }
  }

  render() {
    const { allCountries } = this.props;
    const { countryDetails } = this.state;

    const details = this.state.countryDetails ? (
      <React.Fragment>
        <div className="flag">
          <img src={countryDetails.flag} alt={`${countryDetails.name} flag`} title={countryDetails.name} />
        </div>
        <div className="details">
          <h1 className="country-name">{countryDetails.name}</h1>
          <div className="details__container">
            <div className="main-details">
              <p>Native Name: <span>{countryDetails.nativeName}</span></p>
              <p>Population: <span>{Numeral(countryDetails.population).format(0, 0)}</span></p>
              <p>Region: <span> {countryDetails.region}</span></p>
              <p>Sub Region: <span> {countryDetails.subregion}</span></p>
              <p>Capital: <span> {countryDetails.capital}</span></p>
            </div>
            <div className="extra-details">
              <p>Top Level Domain: <span> {countryDetails.topLevelDomain}</span></p>
              <p>
                Currencies: {countryDetails.currencies ? countryDetails.currencies.map((item, index) => {
                return (<span key={index}> {item.name} ( {item.symbol} )</span>)
              }) :
                  null}
              </p>
              <p>Languages: {countryDetails.languages ? countryDetails.languages.map((item, index) => {
                return (
                  <span key={index}> {item.name}</span>
                )
              }) : null}</p>
            </div>
          </div>
          {allCountries && (
            <Border
              getCountryNameByCode={this.getCountryNameByCode}
              borderCountriesCode={countryDetails.borders}
            />
          )}
        </div>

      </React.Fragment>
    ) : null


    return (
      <div className="main__wrapper">
        <div className="container">
          <div className="btn back-btn" onClick={this.goBack}>
            <span><i className="fas fa-arrow-left"></i></span>
            Back
          </div>

          <div className="country-details__section">
            {details}
          </div>
        </div>
      </div>
    )
  }
}

export default CountryDetails
