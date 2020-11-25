import React from "react"

const HourlyForecast = props => {
	let weatherObject = props.hourlyForecast
	let date;
	let day;
	let hours;
	let minutes;
	let formattedTime;


	//  need to account for daylight hours
	
	let hourlyArray = weatherObject.map(hour => {
		date = new Date(hour.dt * 1000);
		day = date.toLocaleString("en-US", {weekday: 'long'});
		hours = date.getHours();
		minutes = "0" + date.getMinutes();
		minutes = minutes.substr(-2);
		let simpleHours = getSimpleTime(hours);
		formattedTime = day + ' ' + simpleHours;
		if (hour.weather[0].description === "clear sky"){
			console.log('It will be sunny on', formattedTime)
		}
		if (hour.weather[0].description === "scattered clouds") {
			console.log('It will be partly sunny on', formattedTime)
		}

		return (
			<div key={date}>
				<p style={{fontWeight: 'bold'}}>{formattedTime}  </p>
				<p>{Math.round(hour.temp)} degrees with  {hour.weather[0].description}</p>
				<hr/>
			</div>
		)
	});

	function getSimpleTime() {
		switch (hours) {
      case 0:
        hours = "midnight"
        break
      case 1:
        hours = "1am"
        break
      case 2:
        hours = "2am"
        break
      case 3:
        hours = "3am"
				break
			case 4:
				hours = "4am"
				break
			case 5:
				hours = "5am"
				break
      case 6:
        hours = "6am"
				break
			case 7:
				hours = "7am"
				break
			case 8:
				hours = "8am"
				break
      case 9:
        hours = "9am"
        break
      case 10:
        hours = "10am"
        break
      case 11:
        hours = "11am"
        break
      case 12:
        hours = "noon"
        break
      case 13:
        hours = "1pm"
        break
      case 14:
        hours = "2pm"
        break
      case 15:
        hours = "3pm"
        break
      case 16:
        hours = "4pm"
        break
      case 17:
        hours = "5pm"
        break
      case 18:
        hours = "6pm"
        break
      case 19:
        hours = "7pm"
        break
      case 20:
        hours = "8pm"
        break
      case 21:
        hours = "9pm"
        break
      case 22:
        hours = "10pm"
        break
      case 23:
        hours = "11pm"
        break
      default:
				hours = "who knows when!"
		}
		return hours
	}

  return (
    <div style={{ display: "flex" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
					{hourlyArray}
				</div>
      </ul>
    </div>
  )
}

export default HourlyForecast
