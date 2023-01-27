import axios from 'axios';
const newsList = document.querySelector('.news__list');
const inputEl = document.querySelector('.nav-input');
const INPUT_URL =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=B0ZUSVlU2ktbEQtsL20Qu7htIcN31yWz';
const API_KEY = 'B0ZUSVlU2ktbEQtsL20Qu7htIcN31yWz';
async function getFetch(searchValue) {
  try {
    // const response = await axios.get(${INPUT_URL}, {
    //   params: {
    //     // q: searchValue,
    //     // from: '2022-12-26',
    //     // apiKey: API_KEY,
    //     // sortBy: 'publishedAt',
    //     // searchIn: 'title',
    //     safesearch: true,
    //     page: 1,
    //     pageSize: 40,
    //   },
    // });
    const response = await axios.get(`${INPUT_URL}`);
    console.log(response.data.results);
    console.log(response.data.results[0].media[0]['media-metadata'][0].url);
    // console.log(response.data.response.docs[0].multimedia[0].url);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
getFetch().then(data => createMarkup(data));
function createMarkup(arr) {
  const markup = arr
    .map(item => {
      const date = new Date(item.published_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const getTime = `${day} / ${month} / ${date.getFullYear()}`;
      const imgUrl =
        item.media.length === 0
          ? './src/img/undefined.png'
          : item.media[0]['media-metadata'][2].url;
      const desription =
        item.media.length === 0
          ? 'Sorry, this articles have not description'
          : item.media[0].caption;
      return `<li class="images">
          <img
            src="${imgUrl}"
            alt=""
            width="288px"
            height="395px"
          />
          <button class="img-btn">
            Add to favorite{' '}
            <svg class="favorite-icon" width="16" height="16">
              <use href="../img/symbol-defs.svg#icon-heart"></use>
            </svg>{' '}
          </button>
          <h2 class="description-title">${item.title}</h2>
          <p class="description-of-news">${desription}</p>
          <div class="info-more">
            <p class="date-of-news">${getTime}</p>
            <a href="">Read more</a>
          </div>
        </li>`;
    })
    .join('');

  newsList.innerHTML = markup;
}
