setTimeout(() => {
  if (!localStorage.getItem('read')) {
    return console.log(`ніц нема`);
  }
  console.log(`шось є`);
  console.log(JSON.parse(localStorage.getItem('read')));
  const articleOverlay = document.querySelectorAll('.read-overlay');
  articleOverlay.forEach(item => {
    // console.log(item.dataset.id);
    // if (
    JSON.parse(localStorage.getItem('read')).forEach(arrEl => {
      JSON.parse(localStorage.getItem(arrEl)).find(element => {
        if (element.id === item.dataset.id) {
          console.log(document.querySelector(`div[data-id=${element.id}]`));
          document
            .querySelector(`div[data-id=${element.id}]`)
            .classList.add(`overlay-shown`);
        }
      });
    });
  });
}, 600);

//   console.log(e.target.parentNode.parentNode.children[2].dataset.id);
//   document
//     .querySelector(
//       `div[data-id=${e.target.parentNode.parentNode.children[2].dataset.id}]`
//     )
//     .classList.add(`overlay-shown`);
