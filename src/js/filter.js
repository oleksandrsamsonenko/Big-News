import axios from 'axios';
import { createMarkup } from './markup';
import notFound from '../img/notFound.jpg';
import throttle from 'lodash.throttle';

const API_KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b';
const BASE_URL = 'https://api.nytimes.com/svc/news/v3/content/inyt/';

const boxEl = document.querySelector('.filter-box');
export const newsListEl = document.querySelector('.news__list');

boxEl.addEventListener('click', handleSelectClick);

window.onresize = throttle(handleScreenWidthCange, 500);

getFetchCategories().then(data => {
  createFilterMarkup(data);
});

function handleScreenWidthCange(e) {
  console.log(window.innerWidth);

}

function handleSelectClick(e) {
  if (e.target.value === 'Categories' || e.target.value === 'Others') {
    return;
  }

  getFetch(e.target.value || e.target.dataset.value).then(data => {
    if (!data) {
      createNotFoundMarkup();
      return;
    }
    console.log(data);
    createMarkup(data);
  });
}

async function getFetchCategories() {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`
    );
    const arrey = response.data.results;

    return arrey;
  } catch (error) {
    console.log(error);
  }
}

function createFilterMarkup(arr) {
  let categoriesArr;
  let btnArr;
  let optionArr;
  let markup;

  if (window.innerWidth >= 1280) {
    btnArr = arr
      .map((item, index) => {
        if (index <= 5) {
          return `<button class="filter-btn" data-value="${item.section}">${item.display_name}</button>`;
        } else {
          return;
        }
      })
      .join('');
    optionArr = arr
      .map((item, index) => {
        if (index > 5) {
          return `<option value="${item.section}">${item.display_name}</option>`;
        } else {
          return;
        }
      })
      .join('');

    markup = `${btnArr}<form class="filter-form">
      <select class="filter-select" name="categories">
     <option class="filter-option" value="Others">Others</option>
     ${optionArr}
     </select></form>`;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    btnArr = arr
      .map((item, index) => {
        if (index <= 3) {
          return `<button class="filter-btn" data-value="${item.section}">${item.display_name}</button>`;
        } else {
          return;
        }
      })
      .join('');
    optionArr = arr
      .map((item, index) => {
        if (index > 3) {
          return `<option value="${item.section}">${item.display_name}</option>`;
        } else {
          return;
        }
      })
      .join('');

    markup = `${btnArr}<form class="filter-form">
      <select class="filter-select" name="categories">
     <option value="Others">Others</option>
     ${optionArr}
     </select></form>`;
  } else {
    categoriesArr = arr
      .map(item => {
        return `<option value="${item.section}">${item.display_name}</option>`;
      })
      .join('');
    markup = `<select class="filter-select" name="categories">
     <option value="Categories">Categories</option>
     ${categoriesArr}
     </select>`;
  }

  boxEl.innerHTML = markup;
}

function createNotFoundMarkup() {
  const markup = `<div class="not-found__box"><p class="not-found__text">We haven’t found news from this category</p>
  <img class="not-found__img" src="${notFound}" alt="News not found" width="248px" height="198px" /></div>`;
  newsListEl.innerHTML = markup;
}

async function getFetch(categoryName) {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/inyt/${categoryName}.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b&fq=field-name:("title", "section", "url", "published_date", "multimedia")`
    );
    console.log(response);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
