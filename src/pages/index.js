import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.css"

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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                value={this.state.name}
                style={{
                  marginRight: "10px",
                  fontSize: "1.5em",
                  alignSelf: "flex-end",
                }}
                onChange={this.handleChange}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  style={{ margin: "2px" }}
                  className="btn btn-info"
                  type="button"
                  onClick={this.getCurrentWeather}
                >
                  Get Current Weather
                </button>
                <button
                  style={{ margin: "2px" }}
                  className="btn btn-primary"
                  type="button"
                  onClick={this.getFiveDayForecast}
                >
                  Get 5 Day Forecast
                </button>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <button
                style={{ marginTop: "10px" }}
                className="btn btn-secondary"
                type="button"
                onClick={console.log("clear the input field")}
              >
                Start Over
              </button>
            </div>
          </form>
        </div>
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
