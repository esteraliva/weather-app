//Set current date & time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let currentDate = document.querySelector(".weather-details");
currentDate.innerHTML = `TODAY | ${day} ${month} ${date} (${hour}:${minutes}h)<br /><br />`;

//Search city & get temperature
function search(city) {
  let apiKey = "a5efa7105dd4830f86cf23199c044731";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  search(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row forecast">
              <div class="col-4">${formatDay(forecastDay.dt)}</div>
              <div class="col-4">
                <img class="forecast-icons" src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt=${
          forecastDay.weather[0].description
        } width="42" />
              </div>
              <div class="col-4">
                <span class="forecast-max-temperature">${Math.round(
                  forecastDay.temp.max
                )}º</span> | 
                <span class="forecast-min-temperature">${Math.round(
                  forecastDay.temp.min
                )}º</span>
              </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a5efa7105dd4830f86cf23199c044731";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let cityElement = document.querySelector(".city");
  let temperatureElement = document.querySelector("#degrees-today");
  let iconElement = document.querySelector("#weather-icon");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;

  getForecast(response.data.coord);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Barcelona");

//Current button
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;

  let apiKey = "a5efa7105dd4830f86cf23199c044731";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentPosition);

//Change degree units
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-today");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-today");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
