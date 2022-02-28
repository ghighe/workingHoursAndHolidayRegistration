"use strict";

var calendar;
let database;
document.addEventListener('DOMContentLoaded', function () {
  //call the database method
  database = firebase.database();
  //get a database referance
  const ref = database.ref('score/');

  const data =  {
    name: 'Alex',
    score:10
  }
  ref.set(data);

  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    height: 650,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    locale: 'ro',
    selectable: true, //make the cells selectable
    dayMaxEvents: true,
    weekends: false,
    dateClick: function (info) {
      getInfoEvent = info;
      currentDate = info.dateStr;
      defaultStartHoliday.value = currentDate;
      console.log(eventObjDate);
      if (!eventObjDate.includes(currentDate)) {
        displayModal();
      }
      calendar.unselect();
    }
  });
  calendar.render();
});

const formPontaj = document.getElementById('formPontaj');
const msgPontaj = document.getElementById('msgPontaj');
const msgConcedii = document.getElementById('msgConcediu');
const concediu = document.getElementById('formConcedii');
const modal = document.getElementById('id01');
let defaultStartHoliday = document.getElementById("startConcediu");
let currentDate = '';
let eventObjDate = [];
let getInfoEvent = '';



formPontaj.addEventListener('submit', (event) => {
  let hourIn = event.target[0].value;
  let hourOut = event.target[1].value;
  if (hourIn !== '' && hourOut !== '') {
    event.preventDefault();
    const modalHours = {
      id: Math.floor(Math.random() * 1001),
      title: `IN:${hourIn} OUT:${hourOut}`,
      start: currentDate,
      end: currentDate,
      allDay: false,
      backgroundColor: getInfoEvent.dayEl.style.backgroundColor = 'red',
      color: getInfoEvent.dayEl.style.color = 'white'
    }
    if (modalHours) {
      eventObjDate.push(modalHours.start);
      calendar.addEvent(modalHours);
    }
    closeModal();
  }

})


formConcedii.addEventListener('submit', (event) => {
  let inceputConcediu = event.target[0].value;
  let sfarsitConcediu = event.target[1].value;
  event.preventDefault();
  sfarsitConcediu = customDate(sfarsitConcediu);
  const modalHoliday = {
    id: Math.floor(Math.random() * 1001),
    title: `Concediu de odihna(CO)`,
    start: inceputConcediu,
    end: sfarsitConcediu,
    allDay: true,
    backgroundColor: 'green'

  }
  if (modalHoliday) {
    calendar.addEvent(modalHoliday);
  }
  closeModal();
})

function closeModal() {
  modal.style.display = 'none';
  document.getElementById('mySelect').value = '';
  formPontaj.style.display = 'none';
  msgPontaj.innerHTML = '';
  msgConcedii.innerHTML = '';
  concediu.style.display = 'none';
}

function displayModal() {
  modal.style.display = 'block';
}

function eventChange() {
  const currentSelection = document.getElementById('mySelect').value;
  if (currentSelection === 'Pontaj') {
    formPontaj.style.display = 'block';
    currentDate = currentDate.toLocaleString();
    msgPontaj.innerHTML = `Introduceti orele lucrate pentru <b>${currentDate}</b>`;
    concediu.style.display = 'none';
  } else if (currentSelection === 'Concediu') {
    formPontaj.style.display = 'none';
    concediu.style.display = 'block';
    msgConcedii.innerHTML = 'Introduceti intervalul de concediu';
  } else {
    formPontaj.style.display = 'none';
    concediu.style.display = 'none';
    msgPontaj.innerHTML = 'none';
    msgConcedii.innerHTML = 'none';
  }
  // console.log(`Current selection is ${currentSelection}`);
}
//format the date because the end holiday will finish before the target day with 1 day
function customDate(date) {
  let myDate = new Date(date);
  let day = myDate.getDate() + 1; //increment the day by 1 day
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1; //increment the month because month 0 is December not January
  return year + "-" + "0" + month + "-" + day;
}