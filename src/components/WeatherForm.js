import React from "react"

const WeatherForm = props => {
  return (
    <div>
      <form>
        <input
          onSubmit={props.loadMyWeather}
          type="text"
          name="city"
          placeholder="city"
        />
        <button>Get my freakin' weather!</button>
      </form>
      <div>
        <h4>City: {props.name}</h4>
        {props.temp && <h4>Temperature: {props.temp}</h4>}
      </div>
    </div>
  )
}
export default WeatherForm
