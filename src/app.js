function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${minutes}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamps) {
    let forecastDate = new Date(timestamps * 1000);
    let nextDay = forecastDate.getDay();
    let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return weekdays[nextDay];
}

function displayForecast(resp) {
    let forecastData = resp.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecastData.forEach(function(forecastDay, index) {
        if (0 > index > 7) {
            forecastHTML =
                forecastHTML +
                `<div class="col-2"><h3>${formatDay(
          forecastDay.dt
        )}</h3><ul><li><img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="${forecastDay.weather[0].description}" width="40"></li>
            <li class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )} ºC</li>
                <li class="forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )} ºC</li>
                    </ul>
                    </div>`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
    let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlForecast).then(displayForecast);
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let dateElement = document.querySelector("#date");
    let descriptionElement = document.querySelector("#description");
    let feelslikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let iconElement = document.querySelector("#weather-icon");
    let temperatureElement = document.querySelector("#temperature");
    let tempmaxElement = document.querySelector("#temp-max");
    let tempminElement = document.querySelector("#temp-min");
    let windspeedElement = document.querySelector("#wind-speed");

    celsiusTemp = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    descriptionElement.innerHTML = response.data.weather[0].description;
    feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    iconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    tempmaxElement.innerHTML = Math.round(response.data.main.temp_max);
    tempminElement.innerHTML = Math.round(response.data.main.temp_min);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);

    getForecast(response.data.coord);
}

function search(cityName) {
    let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityinputElement = document.querySelector("#city-input");
    search(cityinputElement.value);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-converter");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-converter");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Dublin");