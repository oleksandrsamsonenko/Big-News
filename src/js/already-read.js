const readWrapperEl = document.querySelector('.read-wrapper');
const keyArr = [];

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
      item => ` <li class="images" data-id="${item.id}">
    <img src="${item.imgUrl}" alt="" width="288px" height="395px" />
    <p class="have-read visually-hidden">Have Read</p>
    <p>${item.category}</p>
    <button class="img-btn favorite-false" data-id="${item.id}">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p>${item.descr}</p>
    <div class="info-more">
      <p class="date">${item.date}</p>
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
    <svg class="roll-icon" width="9" height="15">
        <use href="../img/symbol-defs.svg#icon-Vector-up"></use>
    </svg>
    </button></div>
    <ul class="news__list">${liMarkup}</ul></div>`;
  readWrapperEl.insertAdjacentHTML('beforeend', markup);
}

function handleHideBtnClick(e) {
  console.dir(e.target);
  // if(e.terget.className.value === 'read-btn') {
  //   e.target.parentNode.nextElementSibling.classList.toggle('visually-hidden');
  // }
}

function handleReadMoreBtnClick(e) {
  // if (e.target.nodeName === 'A') {
  // }

  console.dir(e.terget.parentNode);
}
