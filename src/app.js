function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
}

let apiKey = "4dd3862c2f0dfdc275854923e14a1ea3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);