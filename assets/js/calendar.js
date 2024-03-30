let dailyRecords = JSON.parse(localStorage.getItem('logs'));
if (!dailyRecords) {
    dailyRecords = [];
};
//-----------------------------------------------------------------//
//the script below is about calendar area//
let nav = 0;
let clickedDate = null;

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
        //call function when displaying a new calendar month
        getMonthlyTotal();
    });
    nextBtn.addEventListener('click', () => {
        nav++;
        loadCalendar();
        //call function when displaying a new calendar month
        getMonthlyTotal();
    });
}

initBtns();
loadCalendar();
//the script above is about calendar area
//---------------------------------------------------------------------//



//testing modal inputs values
const modalEl = document.getElementById('modal-test');
const dateAreaEl = document.getElementById('modalDateArea');
const formEl = document.getElementById('modalBody');//test modal body
const selectEl = document.getElementById('selectOptionTest');
const amountEl = document.getElementById('amountTest');
const addLogBtnEl = document.getElementById('addBtnTest');//test modal button
const exitBtnEl = document.getElementById('exitBtnTest');

//test modal form submit event
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormSubmit();

    //if the user picked housing
    // totalValues.housing += 

});

function handleFormSubmit() {
    const selectedDate = dateAreaEl.textContent;
    const category = selectEl.value.toString().toLowerCase();
    const amount = parseFloat(amountEl.value);//convert input string to number
    //make sure the amount input is positive
    if (amount >= 0 === true) {
        let existingdayObj = dailyRecords.find(e => e.date === selectedDate);
        if (existingdayObj !== undefined) {
            existingdayObj[category] = amount;
        } else {
            let dayObj = {
                date: 0,
                travel: 0,
                eat: 0,
                clothes: 0,
            };
            dayObj.date = selectedDate;
            dayObj[category] = amount;
            dailyRecords.push(dayObj);
        };
        console.log(dailyRecords);
        localStorage.setItem('logs', JSON.stringify(dailyRecords));
        //call function to calculate monthly total
        getMonthlyTotal();
    } else {
        window.alert('please type in valid number');
    };
    amountEl.value = '';
};

function openModal(date) {
    clickedDate = date;
    const logForDay = dailyRecords.find(e => e.date == clickedDate);
    if (logForDay) {
        console.log('log already exists');
        window.alert('log already exists see console');
        console.log(logForDay);
    } else {
        modalEl.style.display = 'block';
        dateAreaEl.textContent = date;
    };
};

function closeModal() {
    modalEl.style.display = 'none';
    document.getElementById('amountTest').textContent = '';
};
exitBtnEl.addEventListener('click', closeModal);




//-----------------this line below is about sorting array into Month and get monthly total---------------------------------//

function getMonthlyTotal() {
    let totalTravel = 0;
    let totalEat = 0;
    let totalClothes = 0;

    for (let i = 0; i < dailyRecords.length; i++) {
        let daytest = new Date(dailyRecords[i].date);
        if (daytest.getMonth() == new Date().getMonth() + nav) {
            totalTravel += dailyRecords[i].travel;
            totalEat += dailyRecords[i].eat;
            totalClothes += dailyRecords[i].clothes;
        }
    };
    console.log(`TotalTravel $${Number(Math.round(totalTravel + 'e2') + 'e-2').toFixed(2)}`);
    console.log(`TotalEat $${Number(Math.round(totalEat + 'e2') + 'e-2').toFixed(2)}`);
    console.log(`TotalClothes $${Number(Math.round(totalClothes + 'e2') + 'e-2').toFixed(2)}`);
};
