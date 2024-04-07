let dailyRecords = JSON.parse(localStorage.getItem("logs"));
if (!dailyRecords) {
  dailyRecords = [];
}
//-----------------------------------------------------------------//
//the script below is about calendar area//
let nav = 0;
let clickedDate = null;

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarHeaderEl = document.getElementById("calendarHeader");
const calendarEl = document.getElementById("calendarBody");

//calendar header
const backBtn = document.createElement("button");
backBtn.textContent = "<";
backBtn.setAttribute("class", "button is-small");
const monthTxt = document.createElement("h4");
const nextBtn = document.createElement("button");
nextBtn.textContent = ">";
nextBtn.setAttribute("class", "button is-small");
calendarHeaderEl.appendChild(backBtn);
calendarHeaderEl.appendChild(monthTxt);
calendarHeaderEl.appendChild(nextBtn);

//calendar body
function loadCalendar() {
  const dt = new Date(); //today
  const day = dt.getDate();
  dt.setDate(1);
  dt.setMonth(new Date().getMonth() + nav);
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1); //a date
  const daysInMonth = new Date(year, month + 1, 0).getDate(); //a number

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

  calendarEl.innerHTML = "";

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
      const logForDay = dailyRecords.find(e => e.date == clickDay);//copy this code
      if (logForDay) {
        console.log(logForDay);

        const logDiv = document.createElement('div');
        logDiv.setAttribute('class', 'logRecord');
        logDiv.classList.add('has-text-link');
        const button = document.createElement('button');
        button.setAttribute('class', 'logDivBtn');
        button.textContent = 'x';
        logDiv.appendChild(button);
        const dailyUlEl = document.createElement('ul');
        const foodLiEl = document.createElement('li');
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
          //how to make the delete more clear?????
          if (element.matches('button') === true) {
            element.parentElement.style.display = "none";
            const index = dailyRecords.indexOf(logForClickDay);
            dailyRecords.splice(index, 1);
            localStorage.setItem('logs', JSON.stringify(dailyRecords));
            getMonthlyTotal();
            loadCalendar();
          }
        } else {
          ///how to add a condition it is after today??????????
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
//the script above is about calendar area
//---------------------------------------------------------------------//

//testing modal inputs values
const modalEl = document.getElementById("modal-test");
const dateAreaEl = document.getElementById("modalDateArea");
const formEl = document.getElementById("modalBody"); //test modal body
const selectEl = document.getElementById("selectOptionTest");
const amountEl = document.getElementById("amountTest");
const addLogBtnEl = document.getElementById("addBtnTest"); //test modal button
const exitBtnEl = document.getElementById("exitBtnTest");

//test modal form submit event
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  // handleFormSubmit();
  handleFormSubmit(dateAreaEl.textContent);
  loadCalendar();
  getMonthlyTotal();

});

//////////////deleted handle form submit function//////////

function openModal(date) {

  const logForDay = dailyRecords.find((e) => e.date == date);
  if (logForDay) {
    window.alert("log already exists");
    console.log(logForDay);
  } else {
    modalEl.style.display = "block";
    dateAreaEl.textContent = date;
  }
}

function closeModal() {
  modalEl.style.display = "none";
  document.getElementById("amountTest").textContent = "";
}
exitBtnEl.addEventListener("click", closeModal);
document.getElementById('closeBulmaModalBtn').addEventListener("click", closeModal);


//document.getElementById('change-theme').addEventListener("click", changeTheme);


//-----------------this line below is about sorting array into Month and get monthly total---------------------------------//

function getMonthlyTotal() {
  let totalFood = 0;
  let totalUtilities = 0;
  let totalHousing = 0;
  let totalTravel = 0;
  let totalEntertainment = 0;
  let totalGrocery = 0;
  let totalOther = 0;

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
  console.log(
    `TotalFood $${Number(Math.round(totalFood + "e2") + "e-2").toFixed(2)}`
  );
  console.log(
    `TotalUtilities $${Number(
      Math.round(totalUtilities + "e2") + "e-2"
    ).toFixed(2)}`
  );
  console.log(
    `TotalHousing $${Number(Math.round(totalHousing + "e2") + "e-2").toFixed(
      2
    )}`
  );
  console.log(
    `TotalTravel $${Number(Math.round(totalTravel + "e2") + "e-2").toFixed(2)}`
  );
  console.log(
    `TotalEntertainment $${Number(
      Math.round(totalEntertainment + "e2") + "e-2"
    ).toFixed(2)}`
  );
  console.log(
    `TotalGrocery $${Number(Math.round(totalGrocery + "e2") + "e-2").toFixed(
      2
    )}`
  );
  console.log(
    `TotalOther $${Number(Math.round(totalOther + "e2") + "e-2").toFixed(2)}`
  );

  //This part is by Melody Yan//
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
