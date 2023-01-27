import {getFetch, createMarkup} from './markup'

const formEl = document.querySelector('.filter-form')

formEl.addEventListener('click', handleSelectClick)

function handleSelectClick(e) {
    if(e.target.value === 'Categories'){
        return
    }
    console.log(e.target.value)
    getFetch(e.target.value).then(data => createMarkup(data))
}