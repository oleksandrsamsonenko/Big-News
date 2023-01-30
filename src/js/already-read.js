import {dateKey} from '../js/read-more';
// import {up} from '../img/symbol-defs.svg#icon-Vector-up'
// import {down} from '../img/symbol-defs.svg#icon-down'

const readWrapperEl = document.querySelector('.read-wrapper');

if (localStorage.getItem('read')) {
  const localKeyArr = JSON.parse(localStorage.getItem('read'));
  localKeyArr.forEach(element => {
    const date = element;
    const localArr = JSON.parse(localStorage.getItem(`${element}`));
    createMarkupFromLocal(localArr, date);
  });
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
    <button class="img-btn" data-id="${item.id}">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p>${item.descr}</p>
    <div class="info-more">
      <p class="date" data-date="${item.dateKey}">${item.date}</p>
      <a class="read-more-link" href="${item.originUrl}" target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
    </li>`
    )
    .join('');
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
    const newsEl = localArr.find(item => item.id === newsId);
    const indexOfNews = localArr.indexOf(newsEl);
    localArr.splice(indexOfNews, 1);

    console.log('newsReadingDate', newsReadingDate)
    console.log('localArr', localArr)
    console.log('newsEl', newsEl)
    console.log('localArr after splice', localArr)

    if(localStorage.getItem(`${dateKey}`)) {
      const fromLocal = JSON.parse(localStorage.getItem(`${dateKey}`))
      fromLocal.push(newsEl)
      console.log('fromLocal', fromLocal)
      localStorage.setItem(`${dateKey}`, JSON.stringify(fromLocal));
    } else {
      localStorage.setItem(`${dateKey}`, JSON.stringify(newsEl));
    }
  }
}
