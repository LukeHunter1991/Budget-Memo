// Get daily records from local storage
let dailyRecords = JSON.parse(localStorage.getItem("logs"));

// If no records in local storage creates an empty array
if (!dailyRecords) {
  dailyRecords = [];
}

// Create date values for hero calndar
let nav = 0;
let clickedDate = null;

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarHeaderEl = document.getElementById("calendarHeader")
const calendarEl = document.getElementById("calendarBody");

// Create calendar header date and buttons
const backBtn = document.createElement("button");
backBtn.textContent = "<";
backBtn.setAttribute("class", "button is-small");
const monthTxt = document.createElement("h4");
const nextBtn = document.createElement("button");
nextBtn.textContent = ">";
nextBtn.setAttribute("class", "button is-small");

// Add current date and navigation buttons to calendar header
calendarHeaderEl.appendChild(backBtn);
calendarHeaderEl.appendChild(monthTxt);
calendarHeaderEl.appendChild(nextBtn);

// Added additional spacing between month header and navigation buttons
monthTxt.style.margin = "0px 15px";

// Create calendar body
function loadCalendar() {

  // Get todays date
  const dt = new Date();
  const day = dt.getDate();
  dt.setDate(1);
  dt.setMonth(new Date().getMonth() + nav);
  const month = dt.getMonth();
  const year = dt.getFullYear();

  // Create variables for month days
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-au", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  monthTxt.textContent = `${dt.toLocaleDateString("en-au", {
    month: "long",
  })} ${year}`;

  // Clear calendar element
  calendarEl.innerHTML = "";

  // Loop through calendar and create a div to show the date
  for (let i = 0; i < weekdays.length; i++) {
    const weekdayTitleEl = document.createElement("div");
    weekdayTitleEl.setAttribute("class", "weekday-title text-center");
    weekdayTitleEl.innerText = weekdays[i];
    calendarEl.appendChild(weekdayTitleEl);
  }

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayCubeEl = document.createElement("div");
    dayCubeEl.classList.add("day");
    const clickDay = new Date(year, month, i - paddingDays);
    if (i > paddingDays) {
      dayCubeEl.innerText = i - paddingDays;
      const logForDay = dailyRecords.find(e => e.date == clickDay);
      if (logForDay) {

        const logDiv = document.createElement('div');
        logDiv.setAttribute('class', 'logRecord');
        logDiv.classList.add('has-text-link');
        const button = document.createElement('button');
        button.setAttribute('class', 'logDivBtn');
        button.textContent = 'x';
        logDiv.appendChild(button);
        const dailyUlEl = document.createElement('ul');
        const foodLiEl = document.createElement('li');

        // Display only logs that have a user input
        if (logForDay.food != 0) {
          foodLiEl.textContent = `Food: $${logForDay.food.toFixed(2)}`
          dailyUlEl.appendChild(foodLiEl);
        };
        const utilitiesLiEl = document.createElement('li');
        if (logForDay.utilities != 0) {
          utilitiesLiEl.textContent = `Utilities: $${logForDay.utilities.toFixed(2)}`
          dailyUlEl.appendChild(utilitiesLiEl);
        };
        const housingLiEl = document.createElement('li');
        if (logForDay.housing != 0) {
          housingLiEl.textContent = `Housing: $${logForDay.housing.toFixed(2)}`
          dailyUlEl.appendChild(housingLiEl);
        };
        const travelLiEl = document.createElement('li');
        if (logForDay.travel != 0) {
          travelLiEl.textContent = `Travel: $${logForDay.travel.toFixed(2)}`
          dailyUlEl.appendChild(travelLiEl);
        };
        const entertainmentLiEl = document.createElement('li');
        if (logForDay.entertainment != 0) {
          entertainmentLiEl.textContent = `Entertain: $${logForDay.entertainment.toFixed(2)}`
          dailyUlEl.appendChild(entertainmentLiEl);
        };
        const groceryLiEl = document.createElement('li');
        if (logForDay.grocery != 0) {
          groceryLiEl.textContent = `Grocery: $${logForDay.grocery.toFixed(2)}`
          dailyUlEl.appendChild(groceryLiEl);
        };
        const otherLiEl = document.createElement('li');
        if (logForDay.other != 0) {
          otherLiEl.textContent = `Other: $${logForDay.other.toFixed(2)}`
          dailyUlEl.appendChild(otherLiEl);
        };
        logDiv.appendChild(dailyUlEl);
        dayCubeEl.appendChild(logDiv);

        // DIsplay current logs on mouse hover
        dayCubeEl.addEventListener('mouseover', function (event) {
          logDiv.style.display = "block";
        });

        dayCubeEl.addEventListener("mouseleave", (event) => {
          logDiv.style.display = 'none';
        });

      };

      dayCubeEl.classList.add("actual");


      if (i - paddingDays == day && nav == 0) {
        dayCubeEl.setAttribute("id", "todayCube");
      }

      dayCubeEl.addEventListener('click', function (event) {

        const logForClickDay = dailyRecords.find(e => e.date == clickDay);
        if (logForClickDay) {
          const element = event.target;
          if (element.matches('button') === true) {
            element.parentElement.style.display = "none";
            const index = dailyRecords.indexOf(logForClickDay);
            dailyRecords.splice(index, 1);
            localStorage.setItem('logs', JSON.stringify(dailyRecords));
            getMonthlyTotal();
            loadCalendar();
          }
        } else {
          modalEl.style.display = 'block';
          dateAreaEl.textContent = clickDay;
        };

      })
    } else {
      dayCubeEl.classList.add("padding");
    }
    calendarEl.appendChild(dayCubeEl);
  }
}

function initBtns() {
  backBtn.addEventListener("click", () => {
    nav--;
    loadCalendar();
    //call function when displaying a new calendar month
    getMonthlyTotal();
  });
  nextBtn.addEventListener("click", () => {
    nav++;
    loadCalendar();
    //call function when displaying a new calendar month
    getMonthlyTotal();
  });
}

initBtns();
loadCalendar();


// Create variables for all modal elements
const modalEl = document.getElementById("modal-calendar");
const dateAreaEl = document.getElementById("modalDateArea");
const formEl = document.getElementById("modalBody");
const selectEl = document.getElementById("selectOptionCalendar");
const amountEl = document.getElementById("amount-calendar");
const addLogBtnEl = document.getElementById("addBtnCalendar");
const exitBtnEl = document.getElementById("exitBtnCalendar");

// Event listener for modal form submit event
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  handleFormSubmit(dateAreaEl.textContent);
  loadCalendar();
  getMonthlyTotal();

});


function closeModal() {
  modalEl.style.display = "none";
  document.getElementById("amount-calendar").textContent = "";
}
exitBtnEl.addEventListener("click", closeModal);
document.getElementById('closeBulmaModalBtn').addEventListener("click", closeModal);

// Sort array and get montly totals
function getMonthlyTotal() {

  // Create a variable for each cost category
  let totalFood = 0;
  let totalUtilities = 0;
  let totalHousing = 0;
  let totalTravel = 0;
  let totalEntertainment = 0;
  let totalGrocery = 0;
  let totalOther = 0;

  // Loop through records and update totals
  for (let i = 0; i < dailyRecords.length; i++) {
    let daytest = new Date(dailyRecords[i].date);
    if (
      daytest.getMonth() == new Date().getMonth() + nav &&
      daytest.getFullYear() == new Date().getFullYear()
    ) {
      totalFood += dailyRecords[i].food;
      totalUtilities += dailyRecords[i].utilities;
      totalHousing += dailyRecords[i].housing;
      totalTravel += dailyRecords[i].travel;
      totalEntertainment += dailyRecords[i].entertainment;
      totalGrocery += dailyRecords[i].grocery;
      totalOther += dailyRecords[i].other;
    }
  }

  // Display monthly totals
  const foodSum = document.querySelector('.js-food-sum');
  foodSum.innerText = `Food: $ ${Number(Math.round(totalFood + 'e2') + 'e-2').toFixed(2)}`;

  const utilitiesSum = document.querySelector('.js-utilities-sum');
  utilitiesSum.innerText = `Utilities: $ ${Number(Math.round(totalUtilities + 'e2') + 'e-2').toFixed(2)}`;

  const housingSum = document.querySelector('.js-housing-sum');
  housingSum.innerText = `Housing: $ ${Number(Math.round(totalHousing + 'e2') + 'e-2').toFixed(2)}`;

  const travelSum = document.querySelector('.js-travel-sum');
  travelSum.innerText = `Travel: $ ${Number(Math.round(totalTravel + 'e2') + 'e-2').toFixed(2)}`;

  const entertainmentSum = document.querySelector('.js-entertainment-sum');
  entertainmentSum.innerText = `Entertainment: $${Number(Math.round(totalEntertainment + 'e2') + 'e-2').toFixed(2)}`;

  const grocerySum = document.querySelector('.js-grocery-sum');
  grocerySum.innerText = `Grocery: $ ${Number(Math.round(totalGrocery + 'e2') + 'e-2').toFixed(2)}`;

  const otherSum = document.querySelector('.js-other-sum');
  otherSum.innerText = `Other: $ ${Number(Math.round(totalOther + 'e2') + 'e-2').toFixed(2)}`;

  const monthSum = document.querySelector('.js-total');
  monthSum.innerText = 'Total Spending:  $ ' + (totalFood + totalUtilities + totalHousing + totalTravel + totalEntertainment + totalGrocery + totalOther).toFixed(2);
};


getMonthlyTotal();
