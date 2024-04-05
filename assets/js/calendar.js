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
    if (i > paddingDays) {
      dayCubeEl.classList.add("actual");
      dayCubeEl.innerText = i - paddingDays;

      if (i - paddingDays == day && nav == 0) {
        dayCubeEl.setAttribute("id", "todayCube");
      }

      const clickDay = new Date(year, month, i - paddingDays);
      dayCubeEl.addEventListener("click", () => openModal(clickDay));
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
  //if the user picked housing
  // totalValues.housing +=
});

//////////////deleted handle form submit function//////////

function openModal(date) {
  clickedDate = date;
  const logForDay = dailyRecords.find((e) => e.date == clickedDate);
  if (logForDay) {
    console.log("log already exists");
    window.alert("log already exists see console");
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
}
