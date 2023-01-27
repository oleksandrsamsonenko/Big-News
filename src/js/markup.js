import axios from 'axios';
import placeholder from '../img/placeholder.png'

const newsList = document.querySelector('.news__list');
const inputEl = document.querySelector('.search-input');

export async function getFetch() {
  try {
     const response = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b')
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
getFetch().then(data => createMarkup(data));

function createMarkup(arr) {
  const markup = arr.map(item => {
    const date = new Date(item.published_date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const getTime = `${day} / ${month} / ${date.getFullYear()} `;
    let imgUrl
    let description
    if(!item.multimedia) {
      console.log('Media')
      console.log(item.media[0]?.['media-metadata'])
      imgUrl = item.media.length === 0 ? placeholder: item.media[0]?.["media-metadata"][2].url;
    description = item.media.length === 0 || item.media[0].caption === '' ? "Sorry, this article has no description" : item.media[0].caption;
    } else {
      console.log('Mult')
      imgUrl = item.multimedia.length === 0 ? '../img/placeholder.png' : item.multimedia[2].url;
      description = item.multimedia.length === 0 ? "Sorry, this article has no description" : item.multimedia[0].caption;
    }

    return ` <li>
<img src="${imgUrl}" alt="" width="288px" height="395px" />
<button class="img-btn">Add to favorite</button>
      <h2 class="description-title">${item.title}</h2>
      <p>${description}</p>
      <div class="info-more">
        <p class="date">${getTime}</p>
        <a class="read-more-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </li>`;
  })
  .join('');
newsList.innerHTML = markup;
}

inputEl.addEventListener('input', handleInput);
function handleInput(e) {
  getFetch(e.target.value.trim()).then(data => createMarkup(data));
}
