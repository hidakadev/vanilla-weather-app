function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let tempmaxElement = document.querySelector("#temp-max");
    let tempminElement = document.querySelector("#temp-min");
    let feelslikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    tempmaxElement.innerHTML = Math.round(response.data.main.temp_max);
    tempminElement.innerHTML = Math.round(response.data.main.temp_min);
    feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);