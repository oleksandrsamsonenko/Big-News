import axios from 'axios';
const newsList = document.querySelector('.list-news');
const NEW_IRL =
  'https://newsapi.org/v2/everything?' +
  `q= sport` +
  '&from=2022-12-26&sortBy=publishedAt&apiKey=727143a19bc6472fa8d6197ffa5ca054';
  // cfc62234939b43f5b960da3e6ec231b2
const getFetch = async e => {
  try {
    const response = await axios.get(`${NEW_IRL}`);
    console.log(response.data.articles);
    const atributes = response.data.articles;
    atributes.map(item => {
      createMarkup(item);
    });
  } catch (error) {
    console.log(error);
  }
};
getFetch();
function createMarkup(e) {
  const date = new Date(e.publishedAt);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  const getTime = `${day} / ${month} / ${date.getFullYear()} `;
  const markup = ` <li>
<div class="images"><img src="${e.urlToImage}" alt="" width="288px" height="395px" />
<button class="img-btn">Add to favorite</button></div>
        
        <h2>${e.title}</h2>
        
        
        <p>${e.description}</p>
        <div class="info-more">
          <p class="date">${getTime}</p>
          <a href="">Read more</a>
        </div>

      </li>`;
  newsList.insertAdjacentHTML('beforeend', markup);
}
