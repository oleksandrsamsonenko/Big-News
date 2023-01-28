import axios from 'axios';
import {createMarkup} from './markup'

const formEl = document.querySelector('.filter-form')
// const selectEl = document.querySelector('.filter-select')
// console.dir(selectEl)

formEl.addEventListener('click', handleSelectClick)

function handleSelectClick(e) {
    if(e.target.value === 'Categories'){
        return
    }
    console.log(e.target.value)
  getFetch(e.target.value).then(data => 
    
    createMarkup(data)
  
    )
}
async function getFetchCategories() {
  try {
  const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`);
  const arrey = response.data.results;

  return arrey;
  } catch (error) {
    console.log(error);
  }
}

function CreateFilterMarkup (arr) {
  const categoriesArr = arr.map(item =>{
    console.log('item', item)
    return `<option value="${item.section}">${item.display_name}</option>`}
     ).join('');
     console.log(categoriesArr)
     const markup = `<select class="filter-select" name="categories">
     <option value="Categories">Categories</option>
     ${categoriesArr}
     </select>`
     formEl.innerHTML = markup;
}

async function getFetch(categoryName) {
    try {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/inyt/${categoryName}.json?api-key=RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b`);
    return response.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  getFetchCategories().then(data => {
    console.log('Data', data)
    CreateFilterMarkup(data)})