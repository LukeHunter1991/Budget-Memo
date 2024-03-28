//-----------------------------------------------------------------//
//the script below is about calendar area//
let nav = 0;
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const calendarHeaderEl = document.getElementById('calendarHeader');
const calendarEl = document.getElementById('calendarBody');

//calendar header
const backBtn = document.createElement('button');
backBtn.textContent = '<';
backBtn.setAttribute('class', 'rounded border w-5');
const monthTxt = document.createElement('h4');
const nextBtn = document.createElement('button');
nextBtn.textContent = '>';
nextBtn.setAttribute('class', 'rounded border w-5');
calendarHeaderEl.appendChild(backBtn);
calendarHeaderEl.appendChild(monthTxt);
calendarHeaderEl.appendChild(nextBtn);

//calendar body
function loadCalendar() {
    const dt = new Date();//today
    dt.setMonth(new Date().getMonth() + nav);
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);//a date
    const daysInMonth = new Date(year, month + 1, 0).getDate();//a number

    const dateString = firstDayOfMonth.toLocaleDateString('en-au', {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    console.log(dateString);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    monthTxt.textContent = `${dt.toLocaleDateString('en-au', { month: 'long' })} ${year}`;

    calendarEl.innerHTML = '';

    for (let i = 0; i < weekdays.length; i++) {
        const weekdayTitleEl = document.createElement('div');
        weekdayTitleEl.setAttribute('class', 'weekday-title text-center');
        weekdayTitleEl.innerText = weekdays[i];
        calendarEl.appendChild(weekdayTitleEl);
    };

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const dayCubeEl = document.createElement('div');
        dayCubeEl.classList.add('day');
        if (i > paddingDays) {
            dayCubeEl.classList.add('actual');
            dayCubeEl.innerText = i - paddingDays;

            if (i - paddingDays == day && nav == 0) {
                dayCubeEl.setAttribute('id', 'todayCube');
            };

            const clickDay = new Date(year, month, i - paddingDays);
            dayCubeEl.addEventListener('click', () =>
                openModal(clickDay));
        } else {
            dayCubeEl.classList.add('padding');
        }
        calendarEl.appendChild(dayCubeEl);
    }
};

function initBtns() {
    backBtn.addEventListener('click', () => {
        nav--;
        loadCalendar();
    });
    nextBtn.addEventListener('click', () => {
        nav++;
        loadCalendar();
    });
}

initBtns();
loadCalendar();
//the script above is about calendar area
//---------------------------------------------------------------------//



//testing modal inputs values
const addLogBtnEl = document.getElementById('addBtn');//test modal button
const formEl = document.getElementById('modalBody');//test modal body
//test modal form submit event
formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(document.getElementById('modalDateArea').textContent);

    //if the user picked housing
    // totalValues.housing += 

});

function openModal(date) {
    const modalEl = document.getElementById('modal-test');
    modalEl.style.display = 'block';
    const dateAreaEl = document.getElementById('modalDateArea');
    dateAreaEl.textContent = date;
}