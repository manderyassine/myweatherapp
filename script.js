const apiKey = "f93364d931340153e0d42";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Get all the HTML elements we need to update
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cityElement = document.getElementById("city");
const countryElement = document.getElementById("country");
const temperatureElement = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

// Main function to get weather data
function getWeather(city) {
    // Create the URL with the city name and API key
    const fullUrl = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch data from OpenWeatherMap
    fetch(fullUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData) {
            // Log the weather data to see what we're getting
            console.log('Weather Data:', weatherData);
            // Update the weather information on the page
            showWeatherData(weatherData);
        })
        .catch(function(error) {
            // If there's an error, show an alert
            alert("Please enter a valid city name");
        });
}

// Function to display weather data on the page
function showWeatherData(data) {
    // Update city and country
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    
    // Update temperature (rounded to whole number)
    temperatureElement.textContent = Math.round(data.main.temp);
    
    // Update weather description
    descriptionElement.textContent = data.weather[0].description;
    
    // Update humidity and wind speed
    humidityElement.textContent = data.main.humidity + "%";
    windSpeedElement.textContent = data.wind.speed + " km/h";
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    console.log('Icon Code:', iconCode);
    console.log('Icon URL:', iconUrl);
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].description; 
}

// When search button is clicked
searchButton.addEventListener("click", function() {
    const city = searchInput.value.trim();
    if (city.length > 0) {  // Only search if user typed something
        getWeather(city);
    }
});

// When Enter key is pressed in search box
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const city = searchInput.value.trim();
        if (city.length > 0) {  // Only search if user typed something
            getWeather(city);
        }
    }
});

// When page loads, show weather for tunisia
document.addEventListener("DOMContentLoaded", function() {
    getWeather("Tunisia");
});
