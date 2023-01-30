
const searchInput = document.querySelector(".nav__input");
const searchLupa = document.querySelector(".lupa");
const width = document.querySelector('input').offsetWidth

function addClass() {
  if (searchInput.offsetWidth <= width) {
    searchInput.classList.add("active-input");
    searchLupa.classList.add("lupa-container");
  } 
    return

}

  function removeClass() {
    if (searchInput.value === "") {
      searchInput.classList.remove("active-input");
      searchLupa.classList.remove("lupa-container")
    } 
    return
    }


searchLupa.addEventListener("mouseover", addClass);
searchInput.addEventListener("mouseout", removeClass);

// current page
function setActive() {
  aObj = document.getElementById('main-nav').getElementsByTagName('a');
  for(i=0;i<aObj.length;i++) {
    if(document.location.href.indexOf(aObj[i].href)>=0) {
      aObj[i].className='header__active';
    }
  }
}
window.onload = setActive;
