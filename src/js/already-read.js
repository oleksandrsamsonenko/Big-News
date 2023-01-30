import {up} from '../img/symbol-defs.svg#icon-Vector-up'
import {down} from '../img/symbol-defs.svg#icon-down'

let today = new Date();
const date =
  today.getDate() < 10
    ? today.getDate().toString().padStart(2, 0)
    : today.getDate();
const month =
  today.getMonth() < 10
    ? (today.getMonth() + 1).toString().padStart(2, 0)
    : today.getMonth() + 1;
const year = today.getFullYear();
const dateKey = `${date}/${month}/${year}`;

const readWrapperEl = document.querySelector('.read-wrapper');

if (localStorage.getItem('read')) {
  updateMarkup();
}

readWrapperEl.addEventListener('click', handleHideBtnClick);
readWrapperEl.addEventListener('click', handleReadMoreBtnClick);

function createMarkupFromLocal(arr, newsArrDate) {
  const liMarkup = arr
    .map(
      item => ` <li class="images">
    <img src="${item.imgUrl}" alt="" width="288px" height="395px" />
    <p class="have-read visually-hidden">Have Read</p>
    <p>${item.category}</p>
    <button class="img-btn favorite-false" data-id="${item.id}">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p>${item.descr}</p>
    <div class="info-more">
      <p class="date" data-date="${item.dateKey}">${item.date}</p>
      <a class="read-more-link" href="${item.originUrl}" target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
    </li>`
    )
    .join('');

  setTimeout(() => {
    if (!localStorage.getItem('savedNews')) {
      return;
    }
    const favoriteBtn = document.querySelectorAll('.img-btn');
    favoriteBtn.forEach(item => {
      if (
        JSON.parse(localStorage.getItem('id')).find(elem => {
          return elem === String(item.dataset.id);
        })
      ) {
        item.classList.add('favorite-true');
        item.classList.remove('favorite-false');
        item.textContent = 'Remove from favorite';
      }
    });
  }, 500);
  const markup = `<div class="read-list-box">
    <div class="read-box-inner">
    <p class="read-date">${newsArrDate}</p>
    <button class="read-btn">
    <svg class="roll-down-icon" width="9" height="15">
        <use href="down"></use>
    </svg>
    <svg class="roll-up-icon" width="9" height="15">
        <use href="up"></use>
    </svg>
    </button></div>
    <ul class="news__list read-list">${liMarkup}</ul></div>`;
  readWrapperEl.insertAdjacentHTML('beforeend', markup);
}

function updateMarkup() {
  const localKeyArr = JSON.parse(localStorage.getItem('read'));
    localKeyArr.sort((prev, next) => prev - next).forEach(element => {
      const date = element;
      const localArr = JSON.parse(localStorage.getItem(`${element}`));
      createMarkupFromLocal(localArr, date);
    });
}

function handleHideBtnClick(e) {
  if(e.target.classList.contains('read-btn')) {
    e.target.parentNode.nextElementSibling.classList.toggle('visually-hidden');
  }
}

function handleReadMoreBtnClick(e) {
  if (e.target.classList.contains('read-more-link')) {
    const newsId = e.target.parentNode.parentNode.children[3].dataset.id;
    e.target.parentNode.parentNode.children[1].classList.remove('visually-hidden');
    const newsReadingDate = e.target.previousElementSibling.dataset.date;
    const localArr = JSON.parse(localStorage.getItem(`${newsReadingDate}`));
    const newsItem = localArr.find(item => item.id === newsId);
    const indexOfNews = localArr.indexOf(newsItem);
    localArr.splice(indexOfNews, 1);

    console.log('newsReadingDate', newsReadingDate)
    console.log('localArr', localArr)
    console.log('newsItem', newsItem)
    console.log('indexOfNews', indexOfNews)
    console.log('localArr after splice', localArr)

    if(localStorage.getItem(`${dateKey}`)) {
      const fromLocal = JSON.parse(localStorage.getItem(`${dateKey}`))
      fromLocal.push(newsItem)
      localStorage.setItem(`${dateKey}`, JSON.stringify(fromLocal));
      updateMarkup()
    } else {
      localStorage.setItem(`${dateKey}`, JSON.stringify(newsItem));
      const fromLocal = JSON.parse(localStorage.getItem(`${dateKey}`))
      updateMarkup()
    }
  }
}
