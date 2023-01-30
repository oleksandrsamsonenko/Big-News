const newsList = document.querySelector('.news__list');
let favoriteArticles = [];
if (localStorage.getItem('savedNews')) {
  JSON.parse(localStorage.getItem('savedNews')).map(item => {
    console.log(item.id);
    favoriteArticles.push(item);
  });
}
newsList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    e.target.classList.toggle('favorite-true');
    e.target.classList.toggle('favorite-false');
  }
  if (e.target.classList.contains('favorite-true')) {
    e.target.style.width = '168px';
    e.target.textContent = 'Remove from favorite';

    favoriteArticles.push({
      img: e.target.parentNode.children[0].src,
      href: e.target.parentNode.lastElementChild.lastElementChild.href,
      h2: e.target.parentNode.children[3].textContent,
      description: e.target.parentNode.children[4].textContent,
      date: e.target.parentNode.lastElementChild.children[0].textContent,
      uri: e.target.dataset.id,
      category: e.target.parentNode.children[1].textContent,
    });
    localStorage.setItem('savedNews', JSON.stringify(favoriteArticles));
  }

  if (e.target.classList.contains('favorite-false')) {
    e.target.style.width = '126px';
    e.target.textContent = 'Add to favorite';
    const superNewObj = JSON.parse(localStorage.getItem('savedNews')).filter(
      item => item.uri !== e.target.dataset.id
    );

    localStorage.removeItem('savedNews');
    localStorage.setItem('savedNews', JSON.stringify(superNewObj));
    favoriteArticles = superNewObj;
  }
});
