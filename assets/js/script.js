// DOM Elements List
let timeDisplayEl = $('#time-display');
const APIweather = "042a86fbb574cb5568466fe7eb249647"
let searchHistory = ["Toronto", "Vancouver", "Montreal", "New York", "Los Angeles"];
let forecastEl = document.querySelector("#forecast-card");



//----- 5 Day Forecast API Call -----//
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
    displayForecast: function (data) {

        // Using j as a 'destructured' for loop to cycle through each children of each day of 'Forecast' card.
        let j = 0;

        // For Loop to cycle through the data with i being used to reference the index for the API array reponse
        // Starts at [7] because that is 6:00 am tomorrow, [39] is 6 am five days from now, so set to 40 to ensure all data is looped. 
        // 8 is added to account for 24 hour periods (3hr per index)
        for (let i = 7; i < 40; i += 8) {
            const { dt_txt } = data.list[i];
            const { icon, description } = data.list[i].weather[0];
            const { temp, humidity } = data.list[i].main;
            const { speed } = data.list[i].wind;

            if (j < 5) {
                // Uses children to select html .elements then adds the above variables within strings to display
                forecastEl.children[j].children[0].innerText = dayjs(dt_txt).format('ddd, MMM D');
                forecastEl.children[j].children[1].innerText = temp + "°C";
                forecastEl.children[j].children[2].src = "http://openweathermap.org/img/wn/" + icon + ".png";
                forecastEl.children[j].children[3].innerText = description.toUpperCase();
                forecastEl.children[j].children[4].innerText = "Wind Speed: \n" + speed + " km/hr";
                forecastEl.children[j].children[5].innerText = "Humidity: " + humidity + "%";
                j += 1;
            }
    }
},
}



//----- Current Weather API Call -----//
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

//----- Search Function -----//
function search(city) {
    searchHistory.unshift(city); // Unshift to add to beginning of array.
    searchHistory.pop(); // Pop will stop the array from infinitely building. Add (unshift) +1 at [0] then remove (pop) -1 the last in the array

    // Calls both the curret and future forecast functions using the city being searched. Connected to their respective fetch functions as well.
    weatherForecast.fetchForecast(city);
    weatherCurrent.fetchWeather(city);

    //Save the search history array to local storage
    localStorage.setItem("localStorageSearch", JSON.stringify(searchHistory));    

    // Text Replacement for Search History Buttons for Live Updating
    document.querySelector('#prevCities0').textContent = searchHistory[0];
    document.querySelector('#prevCities1').textContent = searchHistory[1];
    document.querySelector('#prevCities2').textContent = searchHistory[2];
    document.querySelector('#prevCities3').textContent = searchHistory[3];
    document.querySelector('#prevCities4').textContent = searchHistory[4];
}

//----- Init Function to Load Defaults and Locally Saved Search History -----//
function init () {

    // Retrieve the local storage data from the client-side storage
    searchHistory = JSON.parse(localStorage.getItem("localStorageSearch")) || ["Toronto", "Vancouver", "Montreal", "New York", "Los Angeles"];

    // Text Filled for Search History Buttons from local storage
    document.querySelector('#prevCities0').textContent = searchHistory[0];
    document.querySelector('#prevCities1').textContent = searchHistory[1];
    document.querySelector('#prevCities2').textContent = searchHistory[2];
    document.querySelector('#prevCities3').textContent = searchHistory[3];
    document.querySelector('#prevCities4').textContent = searchHistory[4];

    // Calls both the curret and future forecast functions using the city being searched. From init(), it will default load Toronto.
    weatherForecast.fetchForecast("Toronto");
    weatherCurrent.fetchWeather("Toronto");
}
init();





//----- Displays date and time -----//
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);



//----- Search Form/Button Event Listeners -----//
// Search-Button Event Listener
document.querySelector(".search button").addEventListener("click", function() {
    let searchCity = document.querySelector(".search-bar").value
    search(searchCity);
})

// Search-Bar "Enter" Key Event Listener
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        let searchCity = document.querySelector(".search-bar").value
        search(searchCity);
    }
})



//----- Event listeners for Group of Buttons for Search History -----//
// First Button of Search History
document.querySelector("#prevCities0").addEventListener("click", function() {
    // Calls the fetch functions for current weather and forecast with the first search history button/array
    weatherForecast.fetchForecast(searchHistory[0]);
    weatherCurrent.fetchWeather(searchHistory[0]);
})

// Second Button of Search History
document.querySelector("#prevCities1").addEventListener("click", function() {
    // Calls the fetch functions for current weather and forecast with the second search history button/array
    weatherForecast.fetchForecast(searchHistory[1]);
    weatherCurrent.fetchWeather(searchHistory[1]);
})

// Third Button of Search History
document.querySelector("#prevCities2").addEventListener("click", function() {
    // Calls the fetch functions for current weather and forecast with the third search history button/array
    weatherForecast.fetchForecast(searchHistory[2]);
    weatherCurrent.fetchWeather(searchHistory[2]);
})

// Fourth Button of Search History
document.querySelector("#prevCities3").addEventListener("click", function() {
    // Calls the fetch functions for current weather and forecast with the fourth search history button/array
    weatherForecast.fetchForecast(searchHistory[3]);
    weatherCurrent.fetchWeather(searchHistory[3]);
})

// Fifth Button of Search History
document.querySelector("#prevCities4").addEventListener("click", function() {
    // Calls the fetch functions for current weather and forecast with the fifth search history button/array
    weatherForecast.fetchForecast(searchHistory[4]);
    weatherCurrent.fetchWeather(searchHistory[4]);
})