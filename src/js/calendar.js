import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import axios from "axios";
import {createValueMarkup} from './markup'

const inputCalendarEl = document.querySelector(".calendar-inp")
const inputEl = document.querySelector(".search-input")
const KEY = 'RX66xbpKTOQTP8uW8ejKF6pod0BTlz7b'
const value = inputEl.value
let day
let year
let month
const options = {

    dateFormat:"d/m/Y",
    defaultDate: new Date(),
    onClose(selectedDates) {
        const selectedDate = selectedDates[0]
        day = String(selectedDate.getDate()).padStart(2,"0")
        month = String(selectedDate.getMonth()+1).padStart(2,"0")
        year = selectedDate.getFullYear()
          console.log(inputEl.value)

        getNewsByDate(value).then(data => {
            console.log('DATA', data)
            createValueMarkup(data)
        })
    }
}
// Вызов библиотеки чтоб в инпуте появился календарь
flatpickr(inputCalendarEl, options)

async function getNewsByDate(value) {
    try {
        const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?
        q=${value}&facet_field=day_of_week&facet=true&begin_date=${year}${month}${day}&end_date=${year}${month}${day}&api-key=${KEY}`)
       //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${API_KEY}&facet_fields=section_name&facet_filter=true&begin_date=20150101

        // https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&facet_field=day_of_week&facet=true&begin_date=20120101&end_date=20120101&api-key=your-api-key

        return res.data.response;

    }
    catch (error) {
        console.log(error)
    }
}

// function createMarkupByDate(news) {
//     const markup = news.map(item => {
//     })

// }

