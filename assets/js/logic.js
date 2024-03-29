const temp = document.getElementById("temp-data");
const feelLike = document.getElementById("feels-like-data");
const wind = document.getElementById("wind-data");
const humidity = document.getElementById("humidity-data");
const condition = document.getElementById("conditions");
const rainChance = document.getElementById("rain-data");
const holidayElement = document.getElementById("holiday");

const dt = new Date();
const day = dt.getDate();
const month = `0` + (dt.getMonth() + 1);
const year = dt.getFullYear();
const today = `${year}-${month}-${day}`;

function displayCalendar() {
fetch(
  "https://calendarific.com/api/v2/holidays?&api_key=tBQTyKzId08JrbiEdpq5IvkSIOhdkv4h&country=AU&year=2024"
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

function displayWeatherInformation() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=-37.8&lon=144.9&units=metric&appid=c99e09d6cb92d5d017461b58e28e5857"
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

      // Update chance of rain
      if (data.rain && data.rain["1h"] !== undefined) {
        // Checks rain data for the last hour
        rainChance.textContent = `${data.rain["1h"]} mm`;
      } else {
        rainChance.textContent = "No rain expected";
      }
    });
}
// Get modal element
const formEl = document.getElementById("form-container");

// Function to show/hide modal
const Modal = function () {
    if (formEl.getAttribute('class') == 'hide') {
        formEl.setAttribute('class', 'show');
    } else {
        formEl.setAttribute('class', 'hide');
    }
}

// TO DO: Make submit modal function to redirect to calendar page.
const submitModal = function(e) {
    e.preventDefault();
  window.location.href = "/path-to-your-calendar-page";
} 

// Set up event listeners for modal buttons
document.getElementById("add-task-btn").addEventListener('click', Modal);
document.getElementById("closeBtn").addEventListener('click', Modal);
document.getElementById("saveBtn").addEventListener('click', submitModal);

displayCalendar();
displayWeatherInformation();
