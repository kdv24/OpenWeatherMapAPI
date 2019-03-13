import React from "react"

const FiveDayForecast = props => {
  let weatherObject = props.fiveDayForecast
  let weatherArray = Object.entries(weatherObject)

  let tempArray = weatherArray.map(item => {
    var newest = Object.entries(item)
    console.log("newest: ", newest[1][1])
    var single = newest[1][1]
    return <li key={single.dt}>{single.main.temp}</li>
  })

  return (
    <div>
      Five Day Forecast results:
      <ul>{tempArray}</ul>
    </div>
  )
}

export default FiveDayForecast
