import axios from 'axios';

const WEATHER_API_KEY = 'ddb3f4f523554053da0c0f5cbef7c1eb';
const weatherMarkup = document.querySelector(`.weather`);
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];
const date = new Date();

async function getWeatherCoords() {
  try {
    const defaultWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${WEATHER_API_KEY}&q=Valencia&units=metric`
    );

    weatherMarkup.innerHTML = `<div class="weather_wrapper"><p class="weather_temperature">${Math.ceil(
      defaultWeather.data.list[0].main.temp
    )}&deg</p>
      <div class="weather_info"><p class="weather_condition">${
        defaultWeather.data.list[0].weather[0].main
      }</p>
      <p class="weather_geolocation">Valencia</p></div></div>
      <img class="weather_image" src="${`https://openweathermap.org/img/wn/${defaultWeather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=128 height=121 />
      <p class="day">${days[date.getDay()]}</p>
      <p class="date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
      <a class="weather_forecast"
    href="https://www.weather-forecast.com/locations/Valencia/forecasts/latest"
    target="_blank"
    rel="noreferrer noopener"
    class="socials__link link"
    >Weather for week</a>`;

    navigator.geolocation.getCurrentPosition(position => {
      addMarkupByGeo(position.coords.latitude, position.coords.longitude);
    });
  } catch {}
}

async function addMarkupByGeo(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${WEATHER_API_KEY}`
    );
    let currentCity = response.data[0].name;
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${WEATHER_API_KEY}&q=${currentCity}&units=metric`
    );

    weatherMarkup.innerHTML = `<div class="weather_wrapper"><p class="weather_temperature">${Math.round(
      weather.data.list[0].main.temp
    )}&deg</p>
      <div class="weather_info"><p class="weather_condition">${
        weather.data.list[0].weather[0].main
      }</p>
      <p class="weather_geolocation">${currentCity}</p></div></div>
      <img class="weather_image" src="${`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=128 height=121 />
      <p class="day">${days[date.getDay()]}</p>
      <p class="date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
    <a class="weather_forecast"
    href="https://www.weather-forecast.com/locations/${currentCity}/forecasts/latest"
    target="_blank"
    rel="noreferrer noopener"
    class="socials__link link"
    >Weather for week</a>`;
  } catch {}
}

getWeatherCoords();

/* <input
  class="weather_forecast"
  type="button"
  value="Weather for week"
  href="https://www.weather-forecast.com/locations/Kyiv/forecasts/latest"
/>; */
