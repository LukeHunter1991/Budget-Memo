const temp = document.getElementById("temperature");
const feelLike = document.getElementById("feel like temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("conditions");

fetch(
  "https://calendarific.com/api/v2/holidays?&api_key=tBQTyKzId08JrbiEdpq5IvkSIOhdkv4h&country=AU&year=2024"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=-37.8&lon=144.9&units=metric&appid=c99e09d6cb92d5d017461b58e28e5857"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

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
} 

// Set up event listeners for modal buttons
document.getElementById("add-task-btn").addEventListener('click', Modal);
document.getElementById("closeBtn").addEventListener('click', Modal);
document.getElementById("saveBtn").addEventListener('click' )
