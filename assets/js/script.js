// DOM Elements List
var timeDisplayEl = $('#time-display');
const APIweather = "042a86fbb574cb5568466fe7eb249647"
var searchHistory = ["Toronto", "Vancouver", "Montreal", "New York", "Los Angeles"];



// 5 Day Forecast API Call
var weatherForecast = {

    // Fetch Function
    fetchWeather: function(city) {
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

   search: function() {
    let searchCity = document.querySelector(".search-bar").value
    searchHistory.unshift(searchCity); // Unshift to add to beginning of array.
    searchHistory.pop(); // Pop will stop the array from infinitely building. Add (unshift) +1 at [0] then remove (pop) -1 the last in the array
    this.fetchWeather(searchCity)
}
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
    const { name } = data.city;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Uses querySelector to select html .elements then adds the above variables within strings to display
    document.querySelector(".city").innerText = name + " - Current Weather Conditions";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description.toUpperCase();
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
},

}



// Displays date and time
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);



// Search Button Event Listener
document.querySelector(".search button").addEventListener("click", function() {
    weatherForecast.search();
})