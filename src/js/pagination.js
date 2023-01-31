import axios from 'axios';
const numberOfPagination = document.querySelector('.pagination__list');
const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    localStorage.setItem('zxc', JSON.stringify(response.data.results));
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
numberOfPagination.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
});
getFetch().then(data => createMarkup(data));
function createMarkup() {
  const asd = JSON.parse(localStorage.getItem('zxc'));
  const asd1 = asd.slice(0, 8);
  const asd2 = asd.slice(8, 17);
  const asd3 = asd.slice(17, asd.length);
  let total = [];
  total.push(asd1, asd2, asd3);
  console.log(total);

  total.map(item => console.log('123', item[0]));
}
