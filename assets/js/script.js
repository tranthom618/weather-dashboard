// DOM Elements List
var timeDisplayEl = $('#time-display');
var weather = {
   APIweather: "042a86fbb574cb5568466fe7eb249647",

   fetchWeather: function(city) {
    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.APIweather
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
   },

   displayWeather: function (data) {
    const { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { temp, humidity } = data.list[0].main;
    const { speed } = data.list[0].wind;
    console.log(name, icon, description, temp, humidity, speed)
   }
}




// Displays date and time
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}




displayTime();
setInterval(displayTime, 1000);