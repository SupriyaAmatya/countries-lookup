import React, { Component } from 'react'
import SelectBox from './Filter/SelectBox';
import '../../styles/styles.css'
import CountryList from './CountryList/CountryList';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredCountries: null,
      countryName: '',
      region: ''
    }
  }

  //update state whenever a conuntry name is typed in the input field
  onCountrySearchFieldChange = (country) => {
    this.setState(
      () => ({ countryName: country }),
      this.updateFilteredCountries
    );
  }


  //update the state whenever the region is filtered
  onRegionFilter = (region) => {
    this.setState(
      () => ({ region: region }),
      this.updateFilteredCountries
    );
  }

  updateFilteredCountries = () => {
    this.setState((prevState, prevProps) => {
      const { allCountries } = prevProps
      const { countryName, region } = prevState

      //filter counrty based on name typed in search input field
      let filteredCountries = allCountries.filter(country => {
        return country.name
          .toLowerCase()
          .includes(countryName.toLowerCase());
      });

      // filter countries based on selected region from dropdown item
      if (region) {
        filteredCountries = filteredCountries.filter(country => {
          return country.region === region;
        });
      }
      return { filteredCountries }
    });

  }

  componentDidMount() {
    document.title = "Country Search";
  }

  render() {
    const { filteredCountries, countryName, region } = this.state
    const { allCountries } = this.props
    return (
      <div className="main__wrapper">
        <div className="container dashboard__section">
          <div className="filter__section">

            {/* filter by country name from search input */}
            <div className="search-box">
              <span className="search-icon"><i className="fas fa-search"></i></span>
              <input
                type="text"
                placeholder="Search for a country..."
                onChange={(e) => this.onCountrySearchFieldChange(e.target.value)}
                value={countryName} />
            </div>

            {/* filter by region from dropdown select-box */}
            <SelectBox
              allCountries={allCountries}
              items={[
                { value: 'Africa', id: 1 },
                { value: 'Americas', id: 2 },
                { value: 'Asia', id: 3 },
                { value: 'Europe', id: 4 },
                { value: 'Oceania', id: 5 },
                { value: 'Polar', id: 6 },
              ]}
              region={region}
              onRegionFilter={this.onRegionFilter}
            />
          </div>

          <div className="country__section">
            <CountryList
              filteredCountries={filteredCountries ? filteredCountries : allCountries}
              allCountries={allCountries}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
