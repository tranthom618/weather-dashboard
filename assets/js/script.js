// DOM Elements List
var timeDisplayEl = $('#time-display');


var APIweather = "042a86fbb574cb5568466fe7eb249647";

// Displays date and time
function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}




displayTime();
setInterval(displayTime, 1000);