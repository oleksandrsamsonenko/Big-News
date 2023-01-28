const readListEl = document.querySelector('.news__list')

if(localStorage.getItem('read')) {
    const localArr = JSON.parse(localStorage.getItem('read'));
    createMarkupFromLocal(localArr);
}

function createMarkupFromLocal(arr) {
    const markup = arr.map(item => ` <li class="images" id="${item.id}">
    <img src="${item.imgUrl}" alt="" width="288px" height="395px" />
    <p>${item.category}</p>
    <button class="img-btn">Add to favorite</button>
    <h2 class="description-title">${item.title}</h2>
    <p>${item.descr}</p>
    <div class="info-more">
      <p class="date">${item.date}</p>
      <a class="read-more-link" href="${item.originUrl}" target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
    </li>`).join('');
    readListEl.innerHTML = markup;
}