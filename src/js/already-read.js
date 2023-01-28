const newslistEl = document.querySelector('.news__list');

newslistEl.addEventListener('click', handleLinkClick);

function handleLinkClick(e) {
  const newsImgURL = e.target.parentNode.parentNode.children[0].src;
  const newsTitle = e.target.parentNode.parentNode.children[2].textContent;
  const newsDescr = e.target.parentNode.parentNode.children[3].textContent;

  // console.log(newsImgURL);
  // console.log(newsTitle)
  // // console.log(newsDescr)
  // console.log(e.target.href)

  // console.dir(e.target.parentNode.parentNode)
}
