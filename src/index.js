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
currentDate.innerHTML = `TODAY | ${day} ${month} ${date} (${hour}:${minutes}h)<br /> 21º | 14º`;

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

function displayWeather(response) {
  let cityElement = document.querySelector(".city");
  let temperatureElement = document.querySelector("#degrees-today");
  let iconElement = document.querySelector("#weather-icon");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
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
