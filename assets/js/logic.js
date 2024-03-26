const temp = getElementById("temperature");
const feelLike = getElementById("feel like temperature");
const wind = getElementById("wind");
const humidity = getElementById("humidity");
const condition = getElementById("conditions");

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
