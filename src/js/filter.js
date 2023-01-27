import axios from 'axios'

const formEl = document.querySelector('.filter-form')
const newsList = document.querySelector('.news__list');

formEl.addEventListener('click', handleSelectClick)

function handleSelectClick(e) {
    if(e.target.value === 'Categories'){
        return
    }
    console.log(e.target.value)
    getFetch(e.target.value.toLowerCase()).then(data => createMarkup(data))
}

async function getFetch(categoryName) {
    try {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/inyt/${categoryName}.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`)
    return response.data.results
    } catch (error) {
      console.log(error);
    }
  }
  function createMarkup(arr) {
    const markup = arr.map(item => {
      const date = new Date(item.published_date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');

      const getTime = `${day} / ${month} / ${date.getFullYear()} `;
        const imgUrl = item.multimedia.length === 0 ? '../img/placeholder.png' : item.multimedia[2].url;
        const description = item.multimedia.length === 0 ? "Sorry, this article has no description" : item.multimedia[0].caption;
      // }

      return ` <li>
  <img src="${imgUrl}" alt="" width="288px" height="395px" />
  <button class="img-btn">Add to favorite</button>
        <h2 class="description-title">${item.title}</h2>
        <p>${description}</p>
        <div class="info-more">
          <p class="date">${getTime}</p>
          <a class="read-more-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      </li>`;
    })
    .join('');
  newsList.innerHTML = markup;
  }