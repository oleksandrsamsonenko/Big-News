import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputCalendarEl = document.querySelector(".calendar-input")

const options = {
  
    dateFormat:"d/m/Y",
    defaultDate: new Date(),
    onClose(selectedDates) {
        const selectedDate = selectedDates[0]
        console.log(selectedDate)
    }
}
// Вызов библиотеки чтоб в инпуте появился календарь
flatpickr(inputCalendarEl, options)