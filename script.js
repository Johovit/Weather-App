const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-text");
const apiKey = "6f19bc59eef876adc2d87a87ff052fe8";
const msg = document.getElementById("msg");

searchForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = searchBox.value.trim();

    if(city){
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a city name!");
    }
    
});

async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("City not found. Please try again!");
    }

    return await response.json();   
}

function displayWeatherData(data){
    
    msg.style.display="none";
    const  {name: city,
            main: {temp, humidity, pressure},
            weather: [{description,id}],
            wind: {speed}} = data;
    
    document.getElementById("city-name").textContent = city;
    document.getElementById("wea-emoji").textContent = getWeatherEmoji(id);
    document.getElementById("wea-temp").textContent = `${(temp-273.15).toFixed(1)} °C`;
    document.getElementById("wea-text").textContent = description;
    document.getElementById("wind-text").textContent = `wind speed: ${(speed* 3.6).toFixed(1)} km/h`;
    document.getElementById("hum-text").textContent = `humidity: ${humidity} %`;
    document.getElementById("pre-text").textContent = `pressure: ${pressure} mb`;
}

function getWeatherEmoji(id){
    switch (true) {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 400):
            return "🌦️";
        case (id >= 500 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id === 800):
            return "☀️";
        case (id >= 801 && id <= 804):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(error){
    msg.style.display="block";
    msg.textContent = error.message || error;
}

function openWeather(){
    window.location.href = "weather.html";
}