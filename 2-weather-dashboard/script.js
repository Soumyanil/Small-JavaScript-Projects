// Weather Dashboard Logic

// OpenWeatherMap API details
// Note: You need a free API key from https://openweathermap.org/ to make this work.
// Replace 'YOUR_API_KEY_HERE' with your actual key.
const API_KEY = 'YOUR_API_KEY_HERE'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    // Hide previous UI states
    errorMsg.style.display = 'none';
    weatherInfo.style.display = 'none';
    
    // Check if API key is provided
    if(API_KEY === 'YOUR_API_KEY_HERE') {
      alert("Please add your OpenWeather API key inside script.js for this to work!");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
    
  } catch (error) {
    console.error(error);
    errorMsg.style.display = 'block';
  }
}

function displayWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = Math.round(data.main.temp);
  descEl.textContent = data.weather[0].description;
  
  // Show weather info card
  weatherInfo.style.display = 'block';
}
