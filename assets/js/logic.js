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



  // MODAL CODE

  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });
