import axios from 'axios';
const newsList = document.querySelector('.list-news');
const inputEl = document.querySelector('.nav-input');
const INPUT_URL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=B0ZUSVlU2ktbEQtsL20Qu7htIcN31yWz';
const API_KEY = 'B0ZUSVlU2ktbEQtsL20Qu7htIcN31yWz';
async function getFetch(searchValue) {
  try {
    const response = await axios.get(`${INPUT_URL}`, {
      params: {
        // q: searchValue,
        // from: '2022-12-26',
        // apiKey: API_KEY,
        // sortBy: 'publishedAt',
        // searchIn: 'title',
        safesearch: true,
        page: 1,
        pageSize: 40,
      },
    });
    console.log(response.data.response);
    const atributes = response.data.response;
    return atributes;
  } catch (error) {
    console.log(error);
  }
}
getFetch().then(data => createMarkup(data));
function createMarkup(arr) {
  const markup = arr
    .map(item => {
      const date = new Date(item.publishedAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');

      const getTime = `${day} / ${month} / ${date.getFullYear()} `;
      return ` <li>
<div class="images"><img src="${item.urlToImage}" alt="" width="288px" height="395px" />
<button class="img-btn">Add to favorite  <svg class="favorite-icon" width="16" height="16">
    <use href="../img/symbol-defs.svg#icon-heart"></use>
</svg></button></div>     
        <h2 class="description-title">${item.title}</h2>
        <p class="description-of-news">${item.description}</p>
        <div class="info-more">
          <p class="date-of-news">${getTime}</p>
          <a href="">Read more</a>
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
