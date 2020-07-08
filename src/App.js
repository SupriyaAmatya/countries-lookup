import React, { Component } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard'
import CountryDetails from './components/CountryDetails/CountryDetails'

import './styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allCountries: [],
      theme: 'light'
    }
  }

  toggleTheme = () =>{
    const theme = this.state.theme === 'dark' ? 'light' : 'dark';

    this.setState({ theme });

    document.documentElement.setAttribute("data-theme", theme);
  
  }

  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        this.setState({
          allCountries: res.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <Navbar theme={this.state.theme} toggleTheme={this.toggleTheme} />
        <Switch>
          <Route
            exact
            path='/'
            render={(props) =>
              <Dashboard {...props} allCountries={this.state.allCountries} />
            }
          />

          <Route
            exact
            path='/:countryName'
            render={(props) =>
              <CountryDetails {...props} allCountries={this.state.allCountries} />
            }
          />
        </Switch>
      </div>
    )
  }
}

export default App

