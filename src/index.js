//Set current date & time
let now = new Date();
console.log(now);

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
console.log(day);

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
console.log(month);

let date = now.getDate();
console.log(date);

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
console.log(hour);

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
console.log(minutes);

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
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#degrees-today").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
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
