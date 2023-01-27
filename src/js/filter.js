import axios from 'axios'
// import {getFetch, createMarkup} from './markup'

const formEl = document.querySelector('.filter-form')

formEl.addEventListener('click', handleSelectClick)

function handleSelectClick(e) {
    if(e.target.value === 'Categories'){
        return
    }
    console.log(e.target.value)
    getFetch().then(data => console.log(data))
    // getFetch(e.target.value).then(data => createMarkup(data))
}

async function getFetch() {
    try {
    //   const response = await axios.get(`${NEW_URL}`, {
    //     params: {
    //       q: searchValue,
    //       from: '2022-12-26',
    //       apiKey: API_KEY,
    //       sortBy: 'publishedAt',
    //       searchIn: 'title',
    //       safesearch: true,
    //       page: 1,
    //       pageSize: 40,
    //     },
    //   });
    //   console.log(response.data.articles);
    //   const atributes = response.data.articles;
    //   return atributes;
    const response = await axios.get('https://api.nytimes.com/svc/news/v3/content/section-list.json&api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b')
    return response
    } catch (error) {
      console.log(error);
    }
  }