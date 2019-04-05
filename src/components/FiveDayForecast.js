import React from "react"

const FiveDayForecast = props => {
  let weatherObject = props.fiveDayForecast
  let weatherArray = Object.entries(weatherObject)
  let currentDate = new Date() // set to today - April 5
  let today = currentDate.getDate()
  let printedDate = today
  let forecastDate

  let tempArray = weatherArray.map(item => {
    let newest = Object.entries(item)
    let single = newest[1][1]
    let theDate = new Date(single.dt_txt)
    let forecastMonth = theDate.getMonth() + 1
    switch (forecastMonth) {
      case 0:
        forecastMonth = "January"
        break
      case 1:
        forecastMonth = "February"
        break
      case 3:
        forecastMonth = "March"
        break
      case 4:
        forecastMonth = "April"
        break
      case 5:
        forecastMonth = "May"
        break
      case 6:
        forecastMonth = "June"
        break
      case 7:
        forecastMonth = "July"
        break
      case 8:
        forecastMonth = "August"
        break
      case 9:
        forecastMonth = "September"
        break
      case 10:
        forecastMonth = "October"
        break
      case 11:
        forecastMonth = "November"
        break
      default:
        forecastMonth = "Unknown month"
    }

    forecastDate = theDate.getDate()

    // 1. get the date to check if they're the same

    let forecastTime
    // 2. convert time to non-military
    let time = theDate.getHours()
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
    if (forecastDate === today) {
      printedDate = today
      return (
        <li style={{ listStyle: "none" }} key={single.dt}>
          <strong>
            Weather for {forecastMonth} {forecastDate}:
          </strong>
          <br />{" "}
          <span
            style={{ display: "flex", justifyContent: "space-around" }}
            key={Math.random()}
          >
            <em>{forecastTime}:</em> {Math.round(single.main.temp)} ℉
          </span>
        </li>
      )
    } else {
      if (forecastDate > today) {
        if (forecastDate === printedDate) {
          return (
            <span
              style={{ display: "flex", justifyContent: "space-around" }}
              key={Math.random()}
            >
              <em>{forecastTime}:</em> {Math.round(single.main.temp)} ℉
              <br />
            </span>
          )
        } else {
          printedDate = forecastDate
        }
      }
    }

    return (
      <li
        style={{
          listStyle: "none",
          paddingTop: "10px",
          marginBottom: "0px",
        }}
        key={single.dt}
      >
        <strong>
          Weather for {forecastMonth} {forecastDate}:
        </strong>{" "}
      </li>
    )
  })

  return (
    <div style={{ display: "flex" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tempArray}
      </ul>
    </div>
  )
}

export default FiveDayForecast
