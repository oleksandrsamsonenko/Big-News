const newslistEl = document.querySelector('.news__list');
const readArr = [];
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
// const dateKey = `27/01/2023`
const keyArr = [];
console.log('keyArr', keyArr)

if (localStorage.getItem('read')) {
  const localKeyArr =JSON.parse(localStorage.getItem('read'));
  console.log('localKeyArr',localKeyArr)
  if(!localKeyArr.includes(dateKey)){
    localKeyArr.push(dateKey);
    localStorage.setItem('read', JSON.stringify(localKeyArr))
  }
  keyArr.push(...localKeyArr);
} else {
  keyArr.push(dateKey)
  localStorage.setItem(`read`, JSON.stringify(keyArr));
}
newslistEl.addEventListener('click', handleLinkClick);

function handleLinkClick(e) {
  if(e.target.nodeName !== 'A') {
    return;
  }
  e.target.parentNode.parentNode.classList.add('have-read')

  const newsImgURL = e.target.parentNode.parentNode.children[0].src;
  const newsCategory = e.target.parentNode.parentNode.children[1].textContent;
  const newsId = e.target.parentNode.parentNode.children[2].dataset.id;
  const newsTitle = e.target.parentNode.parentNode.children[3].textContent;
  const newsDescr = e.target.parentNode.parentNode.children[4].textContent;
  const newsPublishedDate = e.target.previousElementSibling.textContent;
  const newsOriginalLink = e.target.href;

  const newsObj = {
    id: newsId,
    imgUrl: newsImgURL,
    category: newsCategory,
    title: newsTitle,
    descr: newsDescr,
    date: newsPublishedDate,
    originUrl: newsOriginalLink,
    dateKey,
  };

  readArr.push(newsObj);

  localStorage.setItem(`${dateKey}`, JSON.stringify(readArr));
}
