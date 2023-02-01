const newslistEl = document.querySelector('.news-wrapper');
const readArr = [];
const keyArr = [];
const idArr = [];
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
// const dateKey = `20/01/2023`;

if (localStorage.getItem('id')) {
  const localIdArr = JSON.parse(localStorage.getItem('id'));
  idArr.push(...localIdArr);
}

newslistEl.addEventListener('click', handleLinkClick, false);

function handleLinkClick(e) {
  if (e.target.classList.contains('read-more-link')) {
    e.target.parentNode.parentNode.classList.add('have-read');
    e.target.parentNode.nextElementSibling.classList.add(`overlay-shown`);

    if (localStorage.getItem('read')) {
      const localKeyArr = JSON.parse(localStorage.getItem('read'));
      if (!localKeyArr.includes(dateKey)) {
        localKeyArr.push(dateKey);
        localStorage.setItem('read', JSON.stringify(localKeyArr));
      } else {
        keyArr.push(...localKeyArr);
      }
    } else {
      keyArr.push(dateKey);
      localStorage.setItem('read', JSON.stringify(keyArr));
    }

    const newsId = e.target.parentNode.parentNode.children[2].dataset.id;

    if (!idArr.includes(newsId)) {
      idArr.push(newsId);
      localStorage.setItem('id', JSON.stringify(idArr));
      pushObj();
      localStorage.setItem(`${dateKey}`, JSON.stringify(readArr));
      return;
    }

    localStorage.setItem('id', JSON.stringify(`${newsId}`));
    pushObj();

    function pushObj() {
      readArr.push({
        id: e.target.parentNode.parentNode.children[2].dataset.id,
        imgUrl: e.target.parentNode.parentNode.children[0].src,
        category: e.target.parentNode.parentNode.children[1].textContent,
        title: e.target.parentNode.parentNode.children[3].textContent,
        descr: e.target.parentNode.parentNode.children[4].textContent,
        date: e.target.previousElementSibling.textContent,
        originUrl: e.target.href,
        dateKey,
      });
      return readArr;
    }

    localStorage.setItem(`${dateKey}`, JSON.stringify(readArr));
  }
}
