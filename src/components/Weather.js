import React from "react"
import FiveDayForecast from "../components/FiveDayForecast"

const Weather = props => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        {props.name && <h4>City: {props.name}</h4>}
        {props.temp && <h4>Temperature: {props.temp}</h4>}
        {props.windspeed && <h4>Windspeed: {props.windspeed}</h4>}
        {props.description && <h4>Description: {props.description}</h4>}
      </div>
      <div>
        {props.fiveDayForecast && (
          <div>
            {/* <h3>Five Day Forecast</h3> */}
            <FiveDayForecast fiveDayForecast={props.fiveDayForecast} />
          </div>
        )}
      </div>
    </div>
  )
}
export default Weather
