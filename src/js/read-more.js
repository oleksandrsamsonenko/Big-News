const newslistEl = document.querySelector('.news__list');
const readArr = [];

newslistEl.addEventListener('click', handleLinkClick);

function handleLinkClick(e) {
  e.target.parentNode.parentNode.setDataAtribut;
  const newsId = e.target.parentNode.parentNode.id;
  const newsImgURL = e.target.parentNode.parentNode.children[0].src;
  const newsCategory = e.target.parentNode.parentNode.children[1].textContent;
  const newsTitle = e.target.parentNode.parentNode.children[3].textContent;
  const newsDescr = e.target.parentNode.parentNode.children[4].textContent;
  const newsPublishedDate = e.target.previousElementSibling.textContent;
  const newsOriginalLink = e.target.href;

  const today = new Date();
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

  console.log(readArr);
  localStorage.setItem('read', JSON.stringify(readArr));
}
