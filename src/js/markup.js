import axios from 'axios';
const newsList = document.querySelector('.list-news');
const inputEl = document.querySelector('.nav-input');
const NEW_URL = 'https://newsapi.org/v2/everything?';
const API_KEY = 'cfc62234939b43f5b960da3e6ec231b2';
async function getFetch(searchValue) {
  try {
    const response = await axios.get(`${NEW_URL}`, {
      params: {
        q: searchValue,
        from: '2022-12-26',
        apiKey: API_KEY,
        sortBy: 'publishedAt',
        searchIn: 'title',
        safesearch: true,
        page: 1,
        pageSize: 40,
      },
    });
    console.log(response.data.articles);
    const atributes = response.data.articles;
    return atributes;
  } catch (error) {
    console.log(error);
  }
}
getFetch('everything').then(data => createMarkup(data));
function createMarkup(arr) {
  const markup = arr
    .map(item => {
      const date = new Date(item.publishedAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');

      const getTime = `${day} / ${month} / ${date.getFullYear()} `;
      return ` <li>
<div class="images"><img src="${item.urlToImage}" alt="" width="288px" height="395px" />
<button class="img-btn">Add to favorite</button></div>
        <h2 class="description-title">${item.title}</h2>
        <p>${item.description}</p>
        <div class="info-more">
          <p class="date">${getTime}</p>
          <a href="${item.url}" rel="noopener noreferrer">Read more</a>
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
