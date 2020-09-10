import React, { Component } from "react";
import ReactDOM from "react-dom";
import { pick } from "lodash";
import "../assets/css/weather.css";

const WEATHER_API_KEY = "2356415561a46eba54be3be14572fe53";
const KL_LAT = "3.082097";
const KL_LONG = "101.670097";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {}
    }
    this.getSuggestion = this.getSuggestion.bind(this);
    this.forecastWeather = this.forecastWeather.bind(this);
  }

  async componentDidMount() {
    const req = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${KL_LAT}&lon=${KL_LONG}&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`);
    const res = await req.json();
    const weather = pick(res, ["current", "daily", "timezone"]);
    this.setState({ weather: weather })
  }

  getSuggestion(weather) {
    let suggestion = "";
    switch (weather) {
      case "Rain":
      case "Thunderstorm":
        suggestion = "It seems like we won't be opening soon.";
        break;
      case "Clouds":
      case "Sunny":
        suggestion = "Opening as usual!"
        break;
      default:
        suggestion = "Until further notice."
    }
    return suggestion;
  }

  forecastWeather(daily) {
    const day = new Intl.DateTimeFormat("en-us", { weekday: "long"}).format(daily.dt * 1000);
    const weather = new String(daily.weather[0].main).toLowerCase();
    let icon;
    switch (weather) {
      case "cloud":
      case "clouds":
        icon = "fas fa-cloud";
        break;
      case "rain":
        icon = "fas fa-cloud-rain";
        break;
      case "sun":
        icon = "fas fa-sun";
        break;
      default:
        icon = "fas fa-cloud-sun";
    }
    return (
      <div class="day">
        <h3>{day}</h3>
        <p>
          <span>
            <i className={icon}></i>
          </span>
        </p>
      </div>
    )
  }

  render() {
    const { current, daily, timezone } = this.state.weather;
    if (current === undefined || current === null) {
      return <p>Failed to load weather.</p>
    }
    const currentWeather = current.weather[0].main;
    const forecast = daily.slice(1, 4).map(this.forecastWeather);
    return (
      <div class="container shadow weather">
        <div class="current">
          <div class="info">
            <div>&nbsp;</div>
            <div class="city"><small><small>CITY:&nbsp;</small></small>{timezone.replace("_", " ")} </div>
            <div class="temp">{(parseFloat(current.temp) - 273.15).toFixed(0)}&deg; <small>Celcius</small></div>
            <div class="wind">{currentWeather}</div>
            <div className="suggestion">{this.getSuggestion(currentWeather)}</div>
          </div>
          <div class="icon">
            <span class="wi-day-sunny"></span>
          </div>
        </div>
        <div class="future">
          {forecast}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Weather />, document.getElementById("weather"));