import React, { Component } from "react"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Weather from "../components/Weather"
import Input from "@material-ui/core/Input"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      temp: undefined,
      windspeed: undefined,
      description: undefined,
      fiveDayForecast: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  getCurrentWeather = async e => {
    e.preventDefault()
    let city = this.state.name

    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=73f40cade82485a32cbc385d8e01e7ea`
    )
    const response = await apiCall.json()
    if (city) {
      this.setState({
        name: city,
        temp: response.main.temp,
        windspeed: response.wind.speed,
        description: response.weather[0].description,
      })
    } else {
      console.log("noop")
    }
  }

  getFiveDayForecast = async e => {
    e.preventDefault()
    let city = this.state.name
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=73f40cade82485a32cbc385d8e01e7ea`
    )
    const response = await apiCall.json()
    if (city) {
      this.setState({
        name: city,
        fiveDayForecast: response.list,
      })
    } else {
      console.log("noop")
    }
  }
  handleChange(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <Layout>
        <h1>Quick OpenWeatherAPI App</h1>
        <form>
          <Input
            type="text"
            name="city"
            id="city"
            placeholder="city"
            value={this.state.name}
            style={{ width: "350px" }}
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.getCurrentWeather}>
            Get Current Weather
          </button>
          <button type="button" onClick={this.getFiveDayForecast}>
            Get Five Day Forecast
          </button>
        </form>
        <Weather
          name={this.state.name}
          temp={this.state.temp}
          windspeed={this.state.windspeed}
          description={this.state.description}
          fiveDayForecast={this.state.fiveDayForecast}
        />
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}
export default IndexPage
