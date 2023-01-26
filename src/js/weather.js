import axios from 'axios';

const WEATHER_API_KEY = 'ddb3f4f523554053da0c0f5cbef7c1eb';

async function getWeather() {
  try {
    const response = axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${WEATHER_API_KEY}&q=Kyiv`
    );
    console.log(response);
  } catch {}
}

getWeather();
