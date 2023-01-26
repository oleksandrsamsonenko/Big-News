import axios from 'axios';

const newsList = document.querySelector('.list-news');
const NEW_URL = 'https://newsapi.org/v2/';
const API_KEY = 'cfc62234939b43f5b960da3e6ec231b2';

export async function getFetch (searchValue) {
  try {
    const response = await axios.get(
      `${NEW_URL}everything?q=${searchValue}&from=2022-12-26&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    console.log(response.data.articles);
    const atributes = response.data.articles;
    // atributes.map(item => {
    //   createMarkup(item);
    // });
    return atributes;
  } catch (error) {
    console.log(error);
  }
};

getFetch().then(data=>createMarkup(data))

export function createMarkup(arr) {
  console.log(e);

  const markup = arr
    .map(item => {
      const date = new Date(item.publishedAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');

      const getTime = `${day} / ${month} / ${date.getFullYear()} `;
      return ` <li>
        <div class="images">
        <img src="${e.urlToImage}" alt="" width="288px" height="395px" />
        <button class="img-btn">Add to favorite</button></div>
        <h2>${e.title}</h2>
        <p>${e.description}</p>
        <div class="info-more">
          <p class="date">${getTime}</p>
          <a href="">Read more</a>
        </div>
        </li>`;
    })
    .join('');
  // newsList.insertAdjacentHTML('beforeend', markup);
  newsList.innerHTML = markup;
}
