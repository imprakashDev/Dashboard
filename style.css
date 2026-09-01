// ============================================================
// script.js
// ============================================================

document.addEventListener("DOMContentLoaded", function () {


console.log("Dashboard JavaScript loaded successfully.");

// Initialize dashboard features
initializeTheme();
initializeTypewriter();
initializeWorldClock();
initializeWeather();


});

// ============================================================
// DARK MODE
// ============================================================

function initializeTheme() {


const themeToggle =
    document.getElementById("themeToggle");

if (!themeToggle) {
    console.warn("Theme toggle button not found.");
    return;
}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.innerHTML = "☀️";

    } else {

        themeToggle.innerHTML = "🌙";

    }

});


}

// ============================================================
// COPY URL
// ============================================================

function copyUrl(button) {


if (!button) {
    return;
}

const input =
    button.parentElement.querySelector(".url-input");

if (!input) {
    return;
}

if (
    navigator.clipboard &&
    navigator.clipboard.writeText
) {

    navigator.clipboard.writeText(input.value)
        .then(function () {

            showCopySuccess(button);

        })
        .catch(function () {

            fallbackCopy(input, button);

        });

} else {

    fallbackCopy(input, button);

}


}

function fallbackCopy(input, button) {


input.select();

document.execCommand("copy");

showCopySuccess(button);


}

function showCopySuccess(button) {


const originalHtml =
    button.innerHTML;

button.innerHTML =
    '<i class="fa-solid fa-check"></i>';

button.classList.add("copied");

setTimeout(function () {

    button.innerHTML =
        originalHtml;

    button.classList.remove("copied");

}, 1500);


}

// ============================================================
// TYPEWRITER
// ============================================================

function initializeTypewriter() {


const typedText =
    document.querySelector(".typed-text");

if (!typedText) {

    console.warn(
        "Element .typed-text not found."
    );

    return;

}


const messages = [

    "Hi, Prakash 👋",

    "Welcome to Dashboard",

    "Manage Everything Faster"

];


let messageIndex = 0;

let characterIndex = 0;

let isDeleting = false;


const typingSpeed = 100;

const deletingSpeed = 50;

const pauseAfterTyping = 2000;

const pauseAfterDeleting = 500;


function typeWriter() {

    const currentMessage =
        messages[messageIndex];


    if (!isDeleting) {

        typedText.textContent =
            currentMessage.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentMessage.length
        ) {

            isDeleting = true;

            setTimeout(
                typeWriter,
                pauseAfterTyping
            );

            return;

        }


        setTimeout(
            typeWriter,
            typingSpeed
        );


    } else {

        typedText.textContent =
            currentMessage.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            isDeleting = false;

            messageIndex++;

            if (
                messageIndex >=
                messages.length
            ) {

                messageIndex = 0;

            }

            setTimeout(
                typeWriter,
                pauseAfterDeleting
            );

            return;

        }


        setTimeout(
            typeWriter,
            deletingSpeed
        );

    }

}


typeWriter();


}

// ============================================================
// WORLD CLOCK
// ============================================================

function initializeWorldClock() {

 
console.log(
    "Initializing world clock..."
);


// Update immediately

updateWorldClock();


// Update every second

setInterval(
    updateWorldClock,
    1000
);
 

}

function updateWorldClock() {

 
const now =
    new Date();


// UTC

const utcElement =
    document.getElementById("utcTime");

if (utcElement) {

    utcElement.textContent =
        formatTime(
            now,
            "UTC"
        );

}


// JST

const jstElement =
    document.getElementById("jstTime");

if (jstElement) {

    jstElement.textContent =
        formatTime(
            now,
            "Asia/Tokyo"
        );

}


// IST

const istElement =
    document.getElementById("istTime");

if (istElement) {

    istElement.textContent =
        formatTime(
            now,
            "Asia/Kolkata"
        );

}
 

}

function formatTime(
date,
timezone
) {

 
return date.toLocaleTimeString(
    "en-GB",
    {
        timeZone: timezone,

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: false
    }
);
 

}

// ============================================================
// WEATHER
// ============================================================

function initializeWeather() {

 
console.log(
    "Initializing weather..."
);


if (!navigator.geolocation) {

    showWeatherError(
        "Your browser does not support location services."
    );

    return;

}


if (!window.isSecureContext) {

    showWeatherError(
        "Weather location requires HTTPS or localhost."
    );

    console.error(
        "Geolocation requires HTTPS or localhost."
    );

    return;

}


requestUserLocation();
 

}

function requestUserLocation() {

 
console.log(
    "Requesting user location..."
);


showWeatherLoading();


navigator.geolocation.getCurrentPosition(

    function (position) {

        console.log(
            "Location permission granted."
        );


        const latitude =
            position.coords.latitude;


        const longitude =
            position.coords.longitude;


        console.log(
            "Latitude:",
            latitude
        );


        console.log(
            "Longitude:",
            longitude
        );


        getWeather(
            latitude,
            longitude
        );

    },


    function (error) {

        console.error(
            "Location error:",
            error
        );


        if (
            error.code ===
            1
        ) {

            showWeatherError(
                "Location permission denied. Please allow location access."
            );

        }

        else if (
            error.code ===
            2
        ) {

            showWeatherError(
                "Unable to determine your location."
            );

        }

        else if (
            error.code ===
            3
        ) {

            showWeatherError(
                "Location request timed out."
            );

        }

        else {

            showWeatherError(
                "Unable to get your location."
            );

        }

    },


    {

        enableHighAccuracy: false,

        timeout: 15000,

        maximumAge: 300000

    }

);
 

}

// ============================================================
// GET WEATHER
// ============================================================

async function getWeather(
latitude,
longitude
) {

 
console.log(
    "Requesting weather data..."
);


try {

    const url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=" +
        "temperature_2m," +
        "relative_humidity_2m," +
        "apparent_temperature," +
        "wind_speed_10m," +
        "weather_code" +
        "&timezone=auto";


    console.log(
        "Weather URL:",
        url
    );


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Weather API HTTP " +
            response.status
        );

    }


    const data =
        await response.json();


    console.log(
        "Weather data:",
        data
    );


    displayWeather(data);


    // Get readable city name

    getCityName(
        latitude,
        longitude
    );


}
catch (error) {

    console.error(
        "Weather request failed:",
        error
    );


    showWeatherError(
        "Unable to load weather data."
    );

}
 

}

// ============================================================
// DISPLAY WEATHER
// ============================================================

function displayWeather(data) {

 
if (
    !data ||
    !data.current
) {

    showWeatherError(
        "Weather information unavailable."
    );

    return;

}


const weather =
    data.current;


// Temperature

const temperature =
    document.getElementById(
        "weatherTemp"
    );

if (temperature) {

    temperature.textContent =
        Math.round(
            weather.temperature_2m
        ) + "°C";

}


// Feels like

const feelsLike =
    document.getElementById(
        "feelsLike"
    );

if (feelsLike) {

    feelsLike.textContent =
        Math.round(
            weather.apparent_temperature
        ) + "°C";

}


// Humidity

const humidity =
    document.getElementById(
        "humidity"
    );

if (humidity) {

    humidity.textContent =
        weather.relative_humidity_2m +
        "%";

}


// Wind

const wind =
    document.getElementById(
        "windSpeed"
    );

if (wind) {

    wind.textContent =
        Math.round(
            weather.wind_speed_10m
        ) + " km/h";

}


// Weather condition

const weatherInfo =
    getWeatherInfo(
        weather.weather_code
    );


const condition =
    document.getElementById(
        "weatherCondition"
    );

if (condition) {

    condition.textContent =
        weatherInfo.description;

}


// Weather icon

const icon =
    document.getElementById(
        "weatherIcon"
    );

if (icon) {

    icon.className =
        "fa-solid " +
        weatherInfo.icon;

}


// Hide loading

const loading =
    document.getElementById(
        "weatherLoading"
    );

if (loading) {

    loading.classList.add(
        "d-none"
    );

}


// Hide error

const error =
    document.getElementById(
        "weatherError"
    );

if (error) {

    error.classList.add(
        "d-none"
    );

}


// Show weather

const content =
    document.getElementById(
        "weatherContent"
    );

if (content) {

    content.classList.remove(
        "d-none"
    );

}
 

}

// ============================================================
// WEATHER CODE
// ============================================================

function getWeatherInfo(code) {

const weatherCodes = {

    0: {
        description: "Clear Sky",
        icon: "fa-sun"
    },

    1: {
        description: "Mainly Clear",
        icon: "fa-cloud-sun"
    },

    2: {
        description: "Partly Cloudy",
        icon: "fa-cloud-sun"
    },

    3: {
        description: "Overcast",
        icon: "fa-cloud"
    },

    45: {
        description: "Fog",
        icon: "fa-smog"
    },

    48: {
        description: "Fog",
        icon: "fa-smog"
    },

    51: {
        description: "Light Drizzle",
        icon: "fa-cloud-rain"
    },

    53: {
        description: "Drizzle",
        icon: "fa-cloud-rain"
    },

    55: {
        description: "Heavy Drizzle",
        icon: "fa-cloud-rain"
    },

    61: {
        description: "Light Rain",
        icon: "fa-cloud-rain"
    },

    63: {
        description: "Rain",
        icon: "fa-cloud-showers-heavy"
    },

    65: {
        description: "Heavy Rain",
        icon: "fa-cloud-showers-heavy"
    },

    71: {
        description: "Light Snow",
        icon: "fa-snowflake"
    },

    73: {
        description: "Snow",
        icon: "fa-snowflake"
    },

    75: {
        description: "Heavy Snow",
        icon: "fa-snowflake"
    },

    80: {
        description: "Rain Showers",
        icon: "fa-cloud-showers-heavy"
    },

    81: {
        description: "Rain Showers",
        icon: "fa-cloud-showers-heavy"
    },

    82: {
        description: "Heavy Rain Showers",
        icon: "fa-cloud-showers-heavy"
    },

    95: {
        description: "Thunderstorm",
        icon: "fa-cloud-bolt"
    },

    96: {
        description: "Thunderstorm with Hail",
        icon: "fa-cloud-bolt"
    },

    99: {
        description: "Thunderstorm with Heavy Hail",
        icon: "fa-cloud-bolt"
    }

};


return (
    weatherCodes[code] || {
        description: "Unknown",
        icon: "fa-cloud"
    }
);


}

// ============================================================
// GET CITY NAME
// ============================================================

async function getCityName(
latitude,
longitude
) {

try {

    const url =
        "https://nominatim.openstreetmap.org/reverse" +
        "?lat=" + latitude +
        "&lon=" + longitude +
        "&format=json";


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Reverse geocoding failed."
        );

    }


    const data =
        await response.json();


    const address =
        data.address || {};


    const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        "Current Location";


    const country =
        address.country ||
        "";


    const location =
        document.getElementById(
            "weatherLocation"
        );


    if (location) {

        location.textContent =
            country
                ? city + ", " + country
                : city;

    }

}
catch (error) {

    console.warn(
        "Could not determine city name:",
        error
    );


    const location =
        document.getElementById(
            "weatherLocation"
        );


    if (location) {

        location.textContent =
            "Current Location";

    }

}


}

// ============================================================
// WEATHER LOADING
// ============================================================

function showWeatherLoading() {


const loading =
    document.getElementById(
        "weatherLoading"
    );

const content =
    document.getElementById(
        "weatherContent"
    );

const error =
    document.getElementById(
        "weatherError"
    );


if (loading) {

    loading.classList.remove(
        "d-none"
    );

}


if (content) {

    content.classList.add(
        "d-none"
    );

}


if (error) {

    error.classList.add(
        "d-none"
    );

}


}

// ============================================================
// WEATHER ERROR
// ============================================================

function showWeatherError(
message
) {


console.error(
    "Weather:",
    message
);


const loading =
    document.getElementById(
        "weatherLoading"
    );

const content =
    document.getElementById(
        "weatherContent"
    );

const error =
    document.getElementById(
        "weatherError"
    );

const errorMessage =
    document.getElementById(
        "weatherErrorMessage"
    );


if (loading) {

    loading.classList.add(
        "d-none"
    );

}


if (content) {

    content.classList.add(
        "d-none"
    );

}


if (error) {

    error.classList.remove(
        "d-none"
    );

}


if (errorMessage) {

    errorMessage.textContent =
        message;

}

}
