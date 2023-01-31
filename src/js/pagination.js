import axios from 'axios';
const numberOfPagination = document.querySelector('.pagination__list');
const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
const options = {
  num_results: 10,
};

async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`, options);
    console.log(options);
    console.log(response.data);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
getFetch();
function createPage() {
  for (let i = 1; i < 20; i++) {
    const markup = `<li><a href="#0">${i}</a></li>`;
    numberOfPagination.insertAdjacentHTML('beforeend', markup);
  }
}
createPage();
