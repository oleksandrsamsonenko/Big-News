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
    addMarkupByGeo(39.466667, -0.375); //заглушка на випадок недоступності координатів користувача

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
      <p class="weather_geolocation"><svg xmlns="http://www.w3.org/2000/svg" class="weather_icon" width="100%" height="100%" fill="none">
        <path fill="#fff" d="M9 1.125a6.195 6.195 0 0 0-6.187 6.188 6.125 6.125 0 0 0 1.246 3.712s.169.222.196.254L9 16.875l4.747-5.599c.025-.03.194-.251.194-.251v-.002a6.123 6.123 0 0 0 1.246-3.71A6.195 6.195 0 0 0 9 1.125Zm0 8.438a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"/>
        </svg>${currentCity}</p></div></div>
      <img class="weather_image" src="${`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}" alt="Weather condition" width=128 height=121 />
      <p class="day">${days[date.getDay()]}</p>
      <p class="date">${String(date.getDate()).padStart(2, '0')}-${
      months[date.getMonth()]
    }-${date.getFullYear()}</p>
    <a class="weather_forecast"
    href="https://openweathermap.org/city/${weather.data.city.id}"
    target="_blank"
    rel="noreferrer noopener"
    class="socials__link link"
    >Weather for week</a>`;
  } catch {}
}

getWeatherCoords();
