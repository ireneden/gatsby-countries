import React, { Component } from "react"
import { graphql } from "gatsby"
import axios from "axios"
import Layout from "../components/layout.js"
import "./index.css"


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

function format (n) {
  return n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

class Country extends Component {
  state = {
    country: {}
  }
  
  render() {
    const {
     countriesApi: { countries },
    } = this.props.data;
    return (
      <div style={{ textAlign: "center", width: "600px", margin: "30px auto" }}>
        <Layout />
          <div className="main-selection">
            <h2>Choose the country below</h2>
            <select value={this.state.country.alpha2Code} onChange={this.onCountryChange}>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select> 
          </div>
          { this.state.country.name &&
          <div className="results">
            <p><strong>Country name: </strong> {this.state.country.name}</p> 
            <p><strong>Region: </strong>{this.state.country.region}</p>
            <p><strong>Capital city: </strong>{this.state.country.capital}</p>
            <p><strong>Population: </strong>{format(this.state.country.population)}</p>
            <p><strong>Currency: </strong>{this.state.country.currencies[0].name}</p>
          </div>
          }
     </div>
    )
  }
  onCountryChange = event => {
    event.preventDefault();
    const code = event.target.value
    axios
    .get(`https://restcountries.eu/rest/v2/alpha/${code}`)
    .then(response => { 
      this.setState({ country: response.data })
    })
  };
}


export default Country
