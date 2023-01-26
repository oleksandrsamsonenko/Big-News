import axios from 'axios';

const WEATHER_API_KEY = 'ddb3f4f523554053da0c0f5cbef7c1eb';
// const WEATHER_API_KEY = `2b29a9c3649d4d28865120314232601`; `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Kiev`;
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
let lattitude = 50.4250764;
let longitude = 30.4808194;

// function getCoords() {
//   navigator.geolocation.getCurrentPosition(position => {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     console.log(position.coords.latitude, position.coords.longitude);
//   });
// }

navigator.geolocation.getCurrentPosition(position => position.coords.latitude);
navigator.geolocation.getCurrentPosition(position => position.coords.longitude);

// function getLat() {
//   navigator.geolocation.getCurrentPosition(position => {
//     lat = position.coords.latitude;
//     console.log(position.coords.latitude);
//     return lat;
//   });
// }
// function getLon() {
//   navigator.geolocation.getCurrentPosition(position => {
//     lon = position.coords.longitude;
//     console.log(position.coords.longitude);
//     return lon;
//   });
// }

async function getCityName() {
  console.log(lattitude, longitude);
  const date = new Date();

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lattitude}&lon=${longitude}&limit=5&appid=${WEATHER_API_KEY}`
    );
    // console.log(response);
    // console.log(response.data[0].name);
    let currentCity = response.data[0].name;
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${WEATHER_API_KEY}&q=${currentCity}&units=metric`
    );
    // console.log(weather);
    // console.log(weather.data.list[0].weather[0].icon);
    // console.log(
    //   `https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`
    // );

    weatherMarkup.innerHTML = `<div class="weather_wrapper"><p class="weather_temperature">${Math.ceil(
      weather.data.list[0].main.temp
    )}&deg</p>
  <div class="weather_info"><p class="weather_condition">${
    weather.data.list[0].weather[0].main
  }</p>
  <p class="weather_geolocation">Kyiv</p></div></div>
  <img src="${`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=150 />
  <p class="day">${days[date.getDay()]}</p>
  <p class="date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
  <input class="weather_forecast" type="button" value="Weather for week" />`;
  } catch {}
}
getCityName();

// https://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid=${WEATHER_API_KEY}

// `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${WEATHER_API_KEY}&q=Kyiv&units=metric`;
// 50.4250764 30.4808194

//  weather.innerHTML = `<p class="weather_temperature">${1}</p>
//   <p class="weather_condition">${1}</p>
//   <p class="weather_geolocation">Kyiv</p>
//   <img src="${1}" alt="Weather condition" width=150 />
//   <p class="day">Monday</p>
//   <p class="date">Current date</p>
//   <input type="button" value="Weather for week" />`;

// https://openweathermap.org/img/wn/10d@2x.png
