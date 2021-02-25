
// API Key and Link 
const api = {
    key: "ba3b2bf2af7c305dd0a95f5542fb7b71",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Create New Date
let date = new Date();
document.querySelector('.date').innerText = date.toDateString();

// Get Searchbox 
const searchbox = document.querySelector('.search-box');
// Add Event Listener for Data Entry into Search Box
searchbox.addEventListener('keypress', setQuery);

// Event Handler for Data Submission
function setQuery(evt) {
    // 13 is equal to 'enter' on the keyboard
    if (evt.keyCode == 13) { 
        getResults(searchbox.value);
    }
}

// Run Fetch Request and Return Weather Results – Query Argument Comes From Searchbox Value
function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        // Convert to JS Object
            return weather.json();
        }).then(displayResults);
    }

// Display Weather Results Within the UI 
function displayResults (weather) {
    console.log(weather);
    
    // Get City Element 
    let city = document.querySelector('.location .city');
    // Assign Value for City from Data 
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Retrieve Present Date Value
    let now = new Date();
    // Get Date Element 
    let date = document.querySelector('.location .date');
    // Call dateBuilder Function to Generate Date
    date.innerText = dateBuilder(now);

    // Get Temp Element
    let temp = document.querySelector('.current .temp');
    // Display Temp Data and append 'ºC'
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`
    
    // Get Weather Element
    let weather_el = document.querySelector('.current .weather');
    // Display Weather Data (Sunny, Cloudy etc.)
    weather_el.innerText = weather.weather[0].main;

    // Get Hi-Low Element
    let hilow = document.querySelector('.hi-low');
    // Display Hi-Low Data and append 'ºC'
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

// Generate Date
function dateBuilder (d) {
    
    // Array for Months
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Array for Days
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Using Inbuilt Methods to Retrive Date Information
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // Return current date 
    return `${day} ${date} ${month} ${year}`;
}


