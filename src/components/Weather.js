import React from "react"

const Weather = props => {
  return (
    <div>
      {props.name && <h4>City: {props.name}</h4>}
      {props.temp && <h4>Temperature: {props.temp}</h4>}
      {props.windspeed && <h4>Windspeed: {props.windspeed}</h4>}
      {props.description && <h4>Description: {props.description}</h4>}
    </div>
  )
}
export default Weather
