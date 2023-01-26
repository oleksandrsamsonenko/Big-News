import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputCalendarEl = document.querySelector(".calendar")

const options = {
  
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates){}
}
// Вызов библиотеки чтоб в инпуте появился календарь
flatpickr(inputCalendarEl, options)