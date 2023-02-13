// DOM Elements List
var timeDisplayEl = $('#time-display');
const APIweather = "042a86fbb574cb5568466fe7eb249647"
var searchHistory = ["Toronto", "Vancouver", "Montreal", "New York", "Los Angeles"];



// 5 Day Forecast API Call
var weatherForecast = {

    // Fetch Function
    fetchForecast: function(city) {
    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" 
        + city 
        + "&units=metric&appid=" 
        + APIweather
    )

    // Response Callbacks
    .then((response) => response.json())
    .then((data) => this.displayForecast(data))
},

    // Data endpoints for 1 Day Ahead. [6] is approx 24 hours worth of indexes ahead. [0] is 6 ahead, [1-6] is 3 each
    display1DayWeather: function (data) {
    const { name } = data.city;
    const { icon, description } = data.list[6].weather[0];
    const { temp, humidity } = data.list[6].main;
    const { speed } = data.list[6].wind;

    // Uses querySelector to select html .elements then adds the above variables within strings to display
    document.querySelector(".city").innerText = name + " - Current Weather Conditions";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description.toUpperCase();
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
   
},

    // Data endpoints for 2 Days Ahead. [14] minus [6] is 8 total indexes over, with each being 3 hours. 8x3 = 24 hours
    display2DayWeather: function (data) {
        const { name } = data.city;
        const { icon, description } = data.list[14].weather[0];
        const { temp, humidity } = data.list[14].main;
        const { speed } = data.list[14].wind;
    
        // Uses querySelector to select html .elements then adds the above variables within strings to display
        document.querySelector(".city").innerText = name + " - Current Weather Conditions";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description.toUpperCase();
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       
},

    // Data endpoints for 3 Days Ahead. [22] is 8 total indexes after, with each being 3 hours. 8x3 = 24 hours
    display3DayWeather: function (data) {
        const { name } = data.city;
        const { icon, description } = data.list[22].weather[0];
        const { temp, humidity } = data.list[22].main;
        const { speed } = data.list[14].wind;
    
        // Uses querySelector to select html .elements then adds the above variables within strings to display
        document.querySelector(".city").innerText = name + " - Current Weather Conditions";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description.toUpperCase();
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       
},

    // Data endpoints for 4 Days Ahead. [30] is 8 total indexes after, with each being 3 hours. 8x3 = 24 hours
    display4DayWeather: function (data) {
        const { name } = data.city;
        const { icon, description } = data.list[30].weather[0];
        const { temp, humidity } = data.list[30].main;
        const { speed } = data.list[30].wind;
    
        // Uses querySelector to select html .elements then adds the above variables within strings to display
        document.querySelector(".city").innerText = name + " - Current Weather Conditions";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description.toUpperCase();
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       
},

    // Data endpoints for 5 Days Ahead. [38] is 8 total indexes after, with each being 3 hours. 8x3 = 24 hours
    display4DayWeather: function (data) {
        const { name } = data.city;
        const { icon, description } = data.list[38].weather[0];
        const { temp, humidity } = data.list[38].main;
        const { speed } = data.list[38].wind;
    
        // Uses querySelector to select html .elements then adds the above variables within strings to display
        document.querySelector(".city").innerText = name + " - Current Weather Conditions";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description.toUpperCase();
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
       
},
}



// Current Weather API Call
var weatherCurrent = {

    // Fetch Function
    fetchWeather: function(city) {
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + APIweather
    )

    // Response Callbacks
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
   },

    // Data endpoints 
    displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Uses querySelector to select html .elements then adds the above variables within strings to display
    document.querySelector(".city").innerText = name + ", " + country.toUpperCase() + " - Current Weather Conditions";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description.toUpperCase();
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
},

}


function search() {
    let searchCity = document.querySelector(".search-bar").value
    searchHistory.unshift(searchCity); // Unshift to add to beginning of array.
    searchHistory.pop(); // Pop will stop the array from infinitely building. Add (unshift) +1 at [0] then remove (pop) -1 the last in the array

    // Calls both the curret and future forecast functions using the city being searched. Connected to their respective fetch functions as well.
    // weatherForecast.fetchForecast(searchCity);
    weatherCurrent.fetchWeather(searchCity);

    // Text Replacement for Search History Buttons for Live Updating
    document.querySelector('#prevCities0').textContent = searchHistory[0];
    document.querySelector('#prevCities1').textContent = searchHistory[1];
    document.querySelector('#prevCities2').textContent = searchHistory[2];
    document.querySelector('#prevCities3').textContent = searchHistory[3];
    document.querySelector('#prevCities4').textContent = searchHistory[4];
}

function init () {

    // Retrieve the local storage data from the client-side storage
    searchHistory = JSON.parse(localStorage.getItem("localStorageSearch")) || ["Toronto", "Vancouver", "Montreal", "New York", "Los Angeles"];

    // Text Filled for Search History Buttons from local storage
    document.querySelector('#prevCities0').textContent = searchHistory[0];
    document.querySelector('#prevCities1').textContent = searchHistory[1];
    document.querySelector('#prevCities2').textContent = searchHistory[2];
    document.querySelector('#prevCities3').textContent = searchHistory[3];
    document.querySelector('#prevCities4').textContent = searchHistory[4];
}
init();





// Displays date and time
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);



// Search Button Event Listener
document.querySelector(".search button").addEventListener("click", function() {
    search();
})

// Search Bar "Enter" Key Event Listener
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        search();
    }
})



// Event listeners for Group of Buttons for Search History
// First Button of Search History
document.querySelector("#prevCities0").addEventListener("click", function() {
    let cityHist = searchHistory[0]; // Retrieves the first city saved in the array

    // Calls the fetch functions for current weather and forecast with the first search history button/array
    // weatherForecast.fetchForecast(cityHist);
    weatherCurrent.fetchWeather(cityHist);
})

// Second Button of Search History
document.querySelector("#prevCities1").addEventListener("click", function() {
    let cityHist = searchHistory[1]; // Retrieves the first city saved in the array

    // Calls the fetch functions for current weather and forecast with the first search history button/array
    // weatherForecast.fetchForecast(cityHist);
    weatherCurrent.fetchWeather(cityHist);
})

// Third Button of Search History
document.querySelector("#prevCities2").addEventListener("click", function() {
    let cityHist = searchHistory[2]; // Retrieves the first city saved in the array

    // Calls the fetch functions for current weather and forecast with the first search history button/array
    // weatherForecast.fetchForecast(cityHist);
    weatherCurrent.fetchWeather(cityHist);
})

// Fourth Button of Search History
document.querySelector("#prevCities3").addEventListener("click", function() {
    let cityHist = searchHistory[3]; // Retrieves the first city saved in the array

    // Calls the fetch functions for current weather and forecast with the first search history button/array
    // weatherForecast.fetchForecast(cityHist);
    weatherCurrent.fetchWeather(cityHist);
})

// Fifth Button of Search History
document.querySelector("#prevCities4").addEventListener("click", function() {
    let cityHist = searchHistory[4]; // Retrieves the first city saved in the array

    // Calls the fetch functions for current weather and forecast with the first search history button/array
    // weatherForecast.fetchForecast(cityHist);
    weatherCurrent.fetchWeather(cityHist);
})