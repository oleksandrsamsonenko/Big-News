import axios from 'axios';
import placeholder from '../img/placeholder.png';
import notFound from '../img/notFound_mob.jpg';

const newsList = document.querySelector('.news__list');
const inputEl = document.querySelector('.search-form');
const markupValue = document.querySelector('.search-input');
let favoriteArticles = [];
if (localStorage.getItem('savedNews')) {
  JSON.parse(localStorage.getItem('savedNews')).map(item => {
    console.log(item.id);
    favoriteArticles.push(item);
  });
}
newsList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    e.target.classList.toggle('favorite-true');
    e.target.classList.toggle('favorite-false');
  }
  if (e.target.classList.contains('favorite-true')) {
    e.target.style.width = '168px';
    e.target.textContent = 'Remove from favorite';

    favoriteArticles.push({
      img: e.target.parentNode.children[0].src,
      href: e.target.parentNode.lastElementChild.lastElementChild.href,
      h2: e.target.parentNode.children[3].textContent,
      description: e.target.parentNode.children[4].textContent,
      date: e.target.parentNode.lastElementChild.children[0].textContent,
      id: e.target.dataset.id,
    });
    localStorage.setItem('savedNews', JSON.stringify(favoriteArticles));
  }

  if (e.target.classList.contains('favorite-false')) {
    e.target.style.width = '126px';
    e.target.textContent = 'Add to favorite';
    const superNewObj = JSON.parse(localStorage.getItem('savedNews')).filter(
      item => item.id !== e.target.dataset.id
    );

    localStorage.removeItem('savedNews');
    localStorage.setItem('savedNews', JSON.stringify(superNewObj));
    favoriteArticles = superNewObj;
  }
});

const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

async function getFetch() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log(response.data);
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
      let category;

      let itemTitle;
      if (item.title.length > 59) {
        itemTitle = item.title.slice(0, 54) + '...'
      } else {
        itemTitle = item.title
      }

      if (item.multimedia) {
        imgUrl =
          item.multimedia.length === 0 ? placeholder : item.multimedia[2].url;
        description =
          item.multimedia.length === 0
            ? 'Sorry, this article has no description'
            : item.multimedia[0].caption;
        category = item.section;
      } else {
        imgUrl =
          item.media.length === 0
            ? placeholder
            : item.media[0]?.['media-metadata'][2].url;
        description =
          item.media.length === 0 || item.media[0].caption === ''
            ? 'Sorry, this article has no description'
            : item.media[0].caption;
        category = item.nytdsection;
      }

      if (description.length > 130) {
        description = description.slice(0, 127) + '...'
      } else {
        description = description
      }

      if (!localStorage.getItem('savedNews')) {
        return `<li class="images">
          <img  class="news-list__img" src="${imgUrl}" alt="" width="288px" height="395px" />
          <p class="news-list__category">${item.nytdsection}</p>
          <button class="img-btn favorite-false " data-id="${item.id}"  >Add to favorite </button>
          <h2 class="description-title">${itemTitle}</h2>
          <p class="description-of-news">${description}</p>
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
      } else if (
        JSON.parse(localStorage.getItem('savedNews')).find(elem => {
          return elem.id === String(item.id);
        })
      ) {
        return `<li class="images">
          <img src="${imgUrl}" alt="" width="288px" height="395px" />
          <p>${item.nytdsection}</p>
          <button class="img-btn favorite-true " data-id="${item.id}" width="168px">Remove from favorite </button>
          <h2 class="description-title">${itemTitle}</h2>
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
      } else {
        return `<li class="images">
          <img src="${imgUrl}" alt="" width="288px" height="395px" />
          <p>${item.nytdsection}</p>
          <button class="img-btn favorite-false " data-id="${item.id}" >Add to favorite </button>
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
      }
    })
    .join('');

  newsList.innerHTML = markup;
}

async function getValueFetch(value) {
  try {
    const fullfield = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${API_KEY}&facet_fields=section_name
&facet_filter=true&begin_date=20150101`
    );

    return fullfield.data.response;
  } catch (error) {
    console.log(error);
  }
}

inputEl.addEventListener('submit', handleInput);
function handleInput(e) {
  e.preventDefault();

  getValueFetch(markupValue.value).then(data => createValueMarkup(data));
}

export function createValueMarkup(e) {
  if (e.docs.length === 0) {
    return (newsList.innerHTML = `<div class="not-found__box"><p class="not-found__text">We haven’t found news from this category</p>
  <img class="not-found__img" src="${notFound}" alt="News not found" width="248px" height="198px" /></div>`);
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
          <button class="img-btn favorite-false " id="favbtn">
            Add to favorite
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
