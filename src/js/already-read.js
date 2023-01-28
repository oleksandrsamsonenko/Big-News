const readWrapperEl = document.querySelector('.read-wrapper');

if (localStorage.getItem('read')) {
  const localArr = JSON.parse(localStorage.getItem('read'));
  createMarkupFromLocal(localArr);
}

readWrapperEl.addEventListener('click', handleHideBtnClick);

function createMarkupFromLocal(arr) {
  const dateArr = arr.map(elem => elem.dateKey);
  const filterDateArr = dateArr.filter(
    (item, index, array) => array.indexOf(item) === index
  );
  const test = filterDateArr.map(item => {
    const date = item;
    const filterArr = arr.filter(item => item.dateKey === date);
    const liMarkup = filterArr
      .map(
        item => ` <li class="images" id="${item.id}">
    <img src="${item.imgUrl}" alt="" width="288px" height="395px" />
    <p>${item.category}</p>
    <button class="img-btn">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p>${item.descr}</p>
    <div class="info-more">
      <p class="date">${item.date}</p>
      <a class="read-more-link" href="${item.originUrl}" target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
    </li>`
      )
      .join('');
    const markup = `<div class="read-list-box">
    <div class="read-box-inner">
    <p class="read-date">${date}</p>
    <button class="read-btn">
    <svg class="roll-icon" width="9" height="15">
        <use href="../img/symbol-defs.svg#icon-Vector-up"></use>
    </svg>
    </button></div>
    <ul class="news__list">${liMarkup}</ul></div>`;
    readWrapperEl.innerHTML = markup;
  });
}

function handleHideBtnClick(e) {
  // console.dir(e.target.classList)
  // if(!e.terget.classList.contains('roll-icon')) {
  //   return
  // }
  console.log(e.target)
  setTimeout((e) => {
    const readListEl = document.querySelector('.news__list');
    readListEl.classList.toggle('visually-hidden')
  }, 1000)
}