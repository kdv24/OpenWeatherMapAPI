import React from "react"

const Weather = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingRight: "30px",
      }}
    >
      <div>
        {/* {props.name && <h4>City: {props.name}</h4>} */}
        {props.temp && <h4>Temperature: {props.temp}</h4>}
        {props.windspeed && <h4>Windspeed: {props.windspeed}</h4>}
        {props.description && <h4>Description: {props.description}</h4>}
      </div>
      <div style={{height: "500px"}}></div>
    </div>
  )
}
export default Weather
