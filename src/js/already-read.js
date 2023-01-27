const newslistEl = document.querySelector('.list-news')

newslistEl.addEventListener('click', handleLinkClick)

function handleLinkClick(e) {
const imgURL = e.target.parentNode.parentNode.firstElementChild.firstElementChild.src;

console.dir(e.target.parentNode.parentNode)
}

//RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b