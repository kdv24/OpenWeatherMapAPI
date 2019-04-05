import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.css"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Weather from "../components/Weather"
import Input from "@material-ui/core/Input"
import FiveDayForecast from "../components/FiveDayForecast"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      temp: undefined,
      windspeed: undefined,
      description: undefined,
      fiveDayForecast: [],
      showCurrentWeather: true,
      showFiveDayForecast: false,
    }
    this.handleChange = this.handleChange.bind(this)
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
      console.log("noop")
    }
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
      })
    } else {
      console.log("noop")
    }
  }

  handleChange(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    console.log(this.state.showCurrentWeather, this.state.showFiveDayForecast)
    return (
      <Layout>
        <div className="container">
          <div className="form-container">
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
            <div className="weather-buttons">
              <button
                className="btn btn-info individual-buttons"
                type="button"
                onClick={this.getCurrentWeather}
              >
                Get Current Weather
              </button>
              <button
                className="btn btn-primary individual-buttons"
                type="button"
                onClick={this.getFiveDayForecast}
              >
                Get 5 Day Forecast
              </button>
              <button
                style={{ marginTop: "10px" }}
                className="btn btn-secondary"
                type="button"
                onClick={() => console.log("clear the input field")}
              >
                Start Over
              </button>
            </div>
          </div>
          <div className="results-container">
            {this.state.showCurrentWeather === true ? (
              <Weather
                name={this.state.name}
                temp={this.state.temp}
                windspeed={this.state.windspeed}
                description={this.state.description}
                fiveDayForecast={this.state.fiveDayForecast}
              />
            ) : (
              <FiveDayForecast
                showFiveDayForecast={this.state.showFiveDayForecast}
                fiveDayForecast={this.state.fiveDayForecast}
              />
            )}
            {this.state.sho}
          </div>
        </div>

        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}
export default IndexPage
