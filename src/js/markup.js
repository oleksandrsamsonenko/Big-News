import axios from 'axios';
const newsList = document.querySelector('.news__list');
const inputEl = document.querySelector('.search-form');
const markupValue = document.querySelector('.search-input');

const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
getFetch().then(data => createMarkup(data));
export function createMarkup(arr) {
  const markup = arr
    .map(item => {
      const date = new Date(item.published_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const getTime = `${day} / ${month} / ${date.getFullYear()}`;
      let imgUrl;
      let description;

      if (item.multimedia) {
        imgUrl =
          item.multimedia.length === 0
            ? '../img/placeholder.png'
            : item.multimedia[2].url;
        description =
          item.multimedia.length === 0
            ? 'Sorry, this article has no description'
            : item.multimedia[0].caption;
      } else {
        imgUrl =
          item.media.length === 0
            ? placeholder
            : item.media[0]?.['media-metadata'][2].url;
        description =
          item.media.length === 0 || item.media[0].caption === ''
            ? 'Sorry, this article has no description'
            : item.media[0].caption;
      }

      return `<li class="images">
          <img src="${imgUrl}" alt="" width="288px" height="395px" />
          <p>${item.nytdsection}</p>
          <button class="img-btn">Add to favorite</button>
          <h2 class="description-title">${item.title}</h2>
          <p>${description}</p>
          <div class="info-more">
            <p class="date">${getTime}</p>
            <a
              class="read-more-link"
              href="${item.url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        </li>`;
    })
    .join('');
  newsList.innerHTML = markup;
}
// function createMarkup(arr) {
//   const markup = arr
//     .map(item => {
//       const date = new Date(item.published_date);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const getTime = `${day} / ${month} / ${date.getFullYear()}`;
//       const imgUrl =
//         item.media.length === 0
//           ? './src/img/undefined.png'
//           : item.media[0]['media-metadata'][2].url;
//       const desription =
//         item.media.length === 0 || item.media[0].caption === ''
//           ? 'Sorry, this articles have not description'
//           : item.media[0].caption;
//       return `<li class="images">
//           <img
//             src="${imgUrl}"
//             alt=""
//             width="288px"
//             height="395px"
//           />
//           <button class="img-btn">
//             Add to favorite{' '}
//             <svg class="favorite-icon" width="16" height="16">
//               <use href="../img/symbol-defs.svg#icon-heart"></use>
//             </svg>{' '}
//           </button>
//           <h2 class="description-title">${item.title}</h2>
//           <p class="description-of-news">${desription}</p>
//           <div class="info-more">
//             <p class="date-of-news">${getTime}</p>
//             <a href="">Read more</a>
//           </div>
//         </li>`;
//     })
//     .join('');

//   newsList.innerHTML = markup;
// }
async function getValueFetch(value) {
  try {
    const fullfield = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${API_KEY}&facet_fields=section_name
&facet_filter=true&begin_date=20150101`
    );
    console.log(fullfield.data.response.docs);
    console.log(fullfield.data.response);
    return fullfield.data.response;
  } catch (error) {
    console.log(error);
  }
}

inputEl.addEventListener('submit', handleInput);
function handleInput(e) {
  e.preventDefault();
  console.log('123', markupValue.value);
  getValueFetch(markupValue.value).then(data => createValueMarkup(data));
}

function createValueMarkup(e) {
  if (e.docs.length === 0) {
    return (newsList.innerHTML = 'sadwer34');
  }
  const valueMarkup = e.docs
    .map(item => {
      const date = new Date(item.pub_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const getTime = `${day} / ${month} / ${date.getFullYear()}`;
      const inputImg =
        item.multimedia.length === 0 ? '' : item.multimedia[0].url;
      return `<li class="images">
          <img
            src="https://static01.nyt.com/${inputImg}"
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
          <h2 class="description-title">${item.headline.main}</h2>
          <p class="description-of-news">${item.abstract}</p>
          <div class="info-more">
            <p class="date-of-news">${getTime}</p>
            <a href="">Read more</a>
          </div>
        </li>`;
    })
    .join('');
  newsList.innerHTML = valueMarkup;
}
