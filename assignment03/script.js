// Function to fetch country data based on search query
async function fetchCountryData(query) {
    const response = await fetch(`https://restcountries.com/v3/name/${query}`);
    const data = await response.json();
    return data[0]; // Assuming only one country is returned for simplicity
  }
  
  // Function to fetch weather data based on country name
  async function fetchWeatherData(countryName) {
    // Replace 'API_KEY' with your actual API key
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=API_KEY&q=${countryName}`);
    const data = await response.json();
    return data.current; // Assuming you want current weather data only
  }
  
  // Function to display country data
  function displayCountryData(country) {
    const countryDetails = document.createElement('div');
    countryDetails.classList.add('country-details');
  
    const flagImg = document.createElement('img');
    flagImg.src = country.flags.png;
    flagImg.alt = `Flag of ${country.name.common}`;
    flagImg.classList.add('flag');
  
    const name = document.createElement('h2');
    name.textContent = country.name.common;
  
    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital}`;
  
    const population = document.createElement('p');
    population.textContent = `Population: ${country.population}`;
  
    const weatherBtn = document.createElement('button');
    weatherBtn.textContent = 'More Details';
    weatherBtn.addEventListener('click', async () => {
      const weatherData = await fetchWeatherData(country.name.common);
      displayWeatherData(weatherData);
    });
  
    countryDetails.appendChild(flagImg);
    countryDetails.appendChild(name);
    countryDetails.appendChild(capital);
    countryDetails.appendChild(population);
    countryDetails.appendChild(weatherBtn);
  
    document.getElementById('country-container').appendChild(countryDetails);
  }
  
  // Function to display weather data
  function displayWeatherData(weatherData) {
    const weatherDetails = document.createElement('div');
    weatherDetails.classList.add('weather-details');
  
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${weatherData.temp_c}°C`;
  
    const condition = document.createElement('p');
    condition.textContent = `Condition: ${weatherData.condition.text}`;
  
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  
    weatherDetails.appendChild(temperature);
    weatherDetails.appendChild(condition);
    weatherDetails.appendChild(humidity);
  
    document.getElementById('weather-container').innerHTML = '';
    document.getElementById('weather-container').appendChild(weatherDetails);
  }
  
  // Function to handle search
  async function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (query.trim() !== '') {
      const countryData = await fetchCountryData(query);
      displayCountryData(countryData);
    }
  }
  
  // Event listener for search form submission
  document.getElementById('search-form').addEventListener('submit', handleSearch);
  