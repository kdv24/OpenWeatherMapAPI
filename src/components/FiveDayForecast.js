import React from "react"

const FiveDayForecast = props => {
  let weatherObject = props.fiveDayForecast
  let weatherArray = Object.entries(weatherObject)

  let tempArray = weatherArray.map(item => {
    let newest = Object.entries(item)
    let single = newest[1][1]
    let thedate = new Date(single.dt_txt)

    // 1. get the date to check if they're the same
    let date = thedate.getDate()

    // 2. convert time to non-military
    let time = thedate.getHours()
    let forecastTime
    switch (time) {
      case 0:
        forecastTime = "12am"
        break
      case 3:
        forecastTime = "3am"
        break
      case 6:
        forecastTime = "6am"
        break
      case 9:
        forecastTime = "9am"
        break
      case 12:
        forecastTime = "noon"
        break
      case 15:
        forecastTime = "3pm"
        break
      case 18:
        forecastTime = "6pm"
        break
      case 21:
        forecastTime = "9pm"
        break
      default:
        forecastTime = "who knows when!"
    }

    return (
      <li key={single.dt}>
        date: {date}: {forecastTime} - {single.main.temp}
      </li>
    )
  })

  return (
    <div style={{ display: "flex" }}>
      {/* Five Day Forecast results: */}
      <ul>{tempArray}</ul>
    </div>
  )
}

export default FiveDayForecast
