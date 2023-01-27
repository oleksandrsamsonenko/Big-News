import axios from 'axios';
import {createMarkup} from './markup'

const formEl = document.querySelector('.filter-form')
const newsList = document.querySelector('.news__list');

formEl.addEventListener('click', handleSelectClick)

function handleSelectClick(e) {
    if(e.target.value === 'Categories'){
        return
    }
    console.log(e.target.value)
    getFetch(e.target.value.toLowerCase()).then(data => createMarkup(data))
}

async function getFetch(categoryName) {
    try {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/inyt/${categoryName}.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`)
    return response.data.results
    } catch (error) {
      console.log(error);
    }
  }