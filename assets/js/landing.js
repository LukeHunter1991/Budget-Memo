const holidayElement = document.getElementById("holiday");
const dateEl = document.getElementById("date-header");
const locationHeader = document.getElementById("current-location");

const submitBtn = document.getElementById("saveBtn");
const expenseInputEl = document.getElementById("expense-select");
const amountInputEl = document.getElementById("value-input");

function formatDate() {
  const dt = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const todayFormatted = new Intl.DateTimeFormat("en-US", options).format(dt);
  dateEl.textContent = todayFormatted;
  return dt;
}
// Set weekday option to the full word
const dt = formatDate();
const day = dt.getDate().toString().padStart(2, "0");
const month = (dt.getMonth() + 1).toString().padStart(2, "0");
const year = dt.getFullYear();
const today = `${year}-${month}-${day}`;
console.log(today);

function displayCalendar() {
  fetch(
    "https://calendarific.com/api/v2/holidays?&api_key=ofmNijWbDefyYA0QvtuDw8NXhyjOOlBL&country=AU&year=2024"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const holidays = data.response.holidays;
      const todayHoliday = holidays.filter(
        (holiday) => holiday.date.iso === today
      );

      if (todayHoliday.length > 0) {
        const holidayToday = todayHoliday[0];
        holidayElement.textContent = holidayToday.name;
      } else {
        holidayElement.textContent = "No holidays today";
      }
    });
}

function updateUserWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      displayWeatherInformation(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    displayWeatherInformation(); // Default to Melbourne if not supported
  }
}

function displayWeatherInformation(lat = -37.8, lon = 144.9) {
  const temp = document.getElementById("temp-data");
  const feelLike = document.getElementById("feels-like-data");
  const wind = document.getElementById("wind-data");
  const humidity = document.getElementById("humidity-data");
  const condition = document.getElementById("conditions");
  const rainChance = document.getElementById("rain-data");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c99e09d6cb92d5d017461b58e28e5857`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Update temperature
      if (temp) {
        temp.textContent = parseInt(data.main.temp) + "°C";
      }

      // Update "feels like" temperature
      if (feelLike) {
        feelLike.textContent = parseInt(data.main.feels_like) + "°C";
      }

      // Update wind speed
      if (wind) {
        wind.textContent = `${data.wind.speed} m/s`;
      }

      // Update humidity
      if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
      }

      // Update weather conditions
      if (condition) {
        condition.textContent = `${data.weather[0].main}`;
      }

      if (locationHeader) {
        locationHeader.textContent = `Current Location: ${data.name}`;
      }

      // Update chance of rain
      if (data.rain && data.rain["1h"] !== undefined) {
        // Checks rain data for the last hour
        rainChance.textContent = `${data.rain["1h"]} mm`;
      } else {
        rainChance.textContent = "No rain expected";
      }
      if (condition && data.weather.length > 0) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("weather-icon").src = iconUrl;
        condition.textContent = `${data.weather[0].main}`;
      }
    });
}
// MODAL CODE

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
    // Display the stored weather icon, if available
    const storedIconUrl = localStorage.getItem("weatherIconUrl");
    if (storedIconUrl) {
      document.getElementById("weather-icon").src = storedIconUrl;
    }

    // Initalise weather and calendar function
    displayCalendar();
    displayWeatherInformation();
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
      dateAreaEl.textContent = new Date().toLocaleDateString("en-au", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

displayCalendar();
displayWeatherInformation();

document
  .getElementById("visit-calendar")
  .addEventListener("click", function (event) {
    event.preventDefault;
    window.location.href = "calendar.html";
  });

// Add function to get/create array in local storage.
let dailyRecords = JSON.parse(localStorage.getItem("logs"));
if (!dailyRecords) {
  dailyRecords = [];
}

// Add function to save index.html form data into local storage
const modalEl = document.getElementById("modal-container");
const dateAreaEl = document.getElementById("modalDateArea");
const formEl = document.getElementById("modalBody");
const selectEl = document.getElementById("expense-select");
const amountEl = document.getElementById("value-input");
const addLogBtnEl = document.getElementById("saveBtn");
const exitBtnEl = document.getElementById("closeBtn");

//test modal form submit event
addLogBtnEl.addEventListener("click", (event) => {
  event.preventDefault();

  const currentDate = new Date();
  const theDay = currentDate.getDate();
  const theMonth = currentDate.getMonth();
  const theYear = currentDate.getFullYear();
  const theDate = new Date(theYear, theMonth, theDay);
  handleFormSubmit(theDate.toString());
  // Clear form
  document.getElementById("form").reset();
});

document
  .getElementById("update-weather-btn")
  .addEventListener("click", function () {
    updateUserWeather();
  });
