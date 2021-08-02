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
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    tempmaxElement.innerHTML = Math.round(response.data.main.temp_max);
    tempminElement.innerHTML = Math.round(response.data.main.temp_min);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
let cityName = "Dublin";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);