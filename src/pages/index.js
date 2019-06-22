import React, { Component } from "react"
import { graphql } from "gatsby"
import axios from 'axios'


export const GatsbyQuery = graphql`
{
  countriesApi {
    countries {
      name
      code
      currency
    }
  }
}
`

class Country extends Component {
  state = {
    country: {
      alpha2Code: '',
      name: '',
      population: 0,
    }
  }
  
  render() {
    const {
     countriesApi: { countries },
    } = this.props.data;

    return (
      <div style={{ textAlign: "center", width: "600px", margin: "50px auto" }}>
        <p>Choose the country below</p>
        <select value={this.state.country.alpha2Code} onChange={this.onCountryChange}>
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.code}
            </option>
          ))}
         </select> 
        { this.state.country.name &&
        <div>
        <p>COUNTRY name: {this.state.country.name}</p> 
        <p>COUNTRY population: {this.state.country.population}</p> 
        </div>
        }
        
     </div>
    )
  }
  onCountryChange = event => {
    event.preventDefault();
    console.log("event.target.value", event.target.value)
    const code = event.target.value
    console.log("code", code)
    axios
    .get(`https://restcountries.eu/rest/v2/alpha/${code}`)
    .then(response => { 
      this.setState({ country: response.data })
    })
  };
}


export default Country
