"use strict";

var calendar;
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    height: 650,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    locale: 'ro',
    selectable: true, //make the cells selectable
    dayMaxEvents: true,
    weekends: false,
    dateClick: function (info) {
      console.log(info);
    getInfoEvent = info;
    currentDate = info.dateStr;
    displayModal();
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
let currentDate = '';
let getInfoEvent = '';

formPontaj.addEventListener('submit', (event) => {
  let hourIn = event.target[0].value;
  let hourOut = event.target[1].value;
  if (hourIn !== '' && hourOut !== '') {
    event.preventDefault();
    const modalHours = {
      title: `IN:${hourIn} OUT:${hourOut}`,
      start: currentDate,
      end: currentDate,
      allDay: false
    }
    console.log(modalHours);
    calendar.addEvent(modalHours);
    getInfoEvent.dayEl.style.backgroundColor = 'green';
    getInfoEvent.dayEl.style.color = 'white';
    closeModal();
  }
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
