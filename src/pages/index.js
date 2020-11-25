import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.css"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Weather from "../components/Weather"
import Input from "@material-ui/core/Input"
import FiveDayForecast from "../components/FiveDayForecast"
import HourlyForecast from "../components/HourlyForecast"
import { green } from "@material-ui/core/colors"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      temp: undefined,
      windspeed: undefined,
      description: undefined,
      hourlyForecast: [],
      fiveDayForecast: [],
      showCurrentWeather: true,
      showHourlyForecast: true,
      showFiveDayForecast: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  getLatLong = async (city) => {
    let apiCall = await fetch(
      `http://open.mapquestapi.com/geocoding/v1/address?key=oxcDDRPFbEv1bFZni10eTQMZ6XJ9F3Zb&location=${city}`
    )
    const response = await apiCall.json();
    const latLong = response.results[0].locations[0].latLng
    const lat = latLong.lat
    const long = latLong.lng
    return {lat, long }
  }

  getCurrentWeather = async e => {
    e.preventDefault()
    let city = this.state.name

    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=73f40cade82485a32cbc385d8e01e7ea`
    )
    const response = await apiCall.json()
    if (city) {
      this.setState({
        name: city,
        temp: response.main.temp,
        windspeed: response.wind.speed,
        description: response.weather[0].description,
        showCurrentWeather: true,
        showFiveDayForecast: false,
      })
    } else {
      alert("Please enter the name of a city.")
    }
  }

  getHourlyForecast = async e => {
    e.preventDefault()
    let city = this.state.name
    const location = await this.getLatLong(city)
    const lat = location.lat
    const long = location.long
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,daily&units=imperial&appid=73f40cade82485a32cbc385d8e01e7ea`
    )
    const response = await apiCall.json()
    const hourly = response.hourly

      this.setState({
        name: city,
        hourlyForecast: hourly,
      })
  }

  getFiveDayForecast = async e => {
    e.preventDefault()
    let city = this.state.name

    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=73f40cade82485a32cbc385d8e01e7ea`
    )
    const response = await apiCall.json()
    if (city) {
      this.setState({
        name: city,
        fiveDayForecast: response.list,
        showCurrentWeather: false,
        showFiveDayForecast: true,
        showHourlyForecast: true,
      })
    } else {
      alert("Please enter the name of a city.")
    }
  }

  handleChange(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <Layout>
        <div className="container">
            <div className="input-form">
              <Input
                className="input-field"
                style={{ fontSize: "1.75em" }}
                type="text"
                name="city"
                id="city"
                placeholder="city"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          <div className="form-container">
            <div className="weather-buttons">
              <button
                className="btn-yellow btn-happy individual-buttons"
                type="button"
                onClick={this.getCurrentWeather}
              >
                Happy Weather
              </button>
              <button
                className="btn-green btn-current individual-buttons"
                type="button"
                onClick={this.getCurrentWeather}
              >
                Current Weather
              </button>
              <button 
                className='btn-green btn-hourly individual-buttons'
                type="button"
                onClick={this.getHourlyForecast}
              >
                  Hourly Forecast
              </button>
              <button
                className="btn-green btn-five-day individual-buttons"
                type="button"
                onClick={this.getFiveDayForecast}
              >
                5 Day Forecast
              </button>
            </div>
              {/* <button
                style={{ marginTop: "10px" }}
                className="btn-yellow btn-start-over"
                type="button"
                onClick={() =>
                  this.setState({
                    name: "",
                    showFiveDayForecast: false,
                    showCurrentWeather: false,
                  })
                }
              >
                Start Over
              </button> */}
          </div>
          {/* <div className="results-container">
            {this.state.showCurrentWeather === true ? (
              <Weather
                name={this.state.name}
                temp={this.state.temp}
                windspeed={this.state.windspeed}
                description={this.state.description}
                fiveDayForecast={this.state.fiveDayForecast}
              />
            ) : (
              ""
            )}
            {this.state.showFiveDayForecast === true ? (
              <FiveDayForecast
                showFiveDayForecast={this.state.showFiveDayForecast}
                fiveDayForecast={this.state.fiveDayForecast}
              />
            ) : (
              ""
            )}
            {this.state.showHourlyForecast === true ? (
              <HourlyForecast 
                showHourlyForecast={this.state.showHourlyForecast}
                hourlyForecast={this.state.hourlyForecast}
              />
            ) : (
              ""
            )}
          </div> */}
          <div className="happy-grid">
            <div className="happy-days">
              <div className="sunday">Sunday</div>
              <div className="monday">Monday</div>
              <div className="tuesday">Tuesday</div>
              <div className="wednesday">Wednesday</div>
              <div className="thursday">Thursday</div>
              <div className="friday">Friday</div>
              <div className="saturday">Saturday</div>
            </div>
          </div>
          <div style={{height: "500px"}}>
          </div>
        </div>
        {/* <Link to="/page-2/">Go to page 2</Link> */}
      </Layout>
    )
  }
}
export default IndexPage
