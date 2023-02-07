// DOM Elements List
var timeDisplayEl = $('#time-display');
var weather = {
   "APIweather": "042a86fbb574cb5568466fe7eb249647",
   fetchWeather: function() {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=toronto&units=metric&appid=042a86fbb574cb5568466fe7eb249647"
    ).then((response) => response.json())
    .then((data) => console.log(data))
   }
}




// Displays date and time
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}




displayTime();
setInterval(displayTime, 1000);