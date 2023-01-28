const newslistEl = document.querySelector('.news__list');
const readArr = [];

console.log(readListEl)

newslistEl.addEventListener('click', handleLinkClick);

function handleLinkClick(e) {
  const newsId = e.target.parentNode.parentNode.id;
  const newsImgURL = e.target.parentNode.parentNode.children[0].src;
  const newsCategory = e.target.parentNode.parentNode.children[1].textContent;
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
    dateKey: new Date().toDateString(),
  };

  readArr.push(newsObj);

  console.log(readArr);
  localStorage.setItem('read', JSON.stringify(readArr));
}