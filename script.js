// ================================
// DARK MODE
// ================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

```
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = "☀️";
    } else {
        themeToggle.innerHTML = "🌙";
    }

});
```

}

// ================================
// COPY URL
// ================================

function copyUrl(button) {

```
const input =
    button.parentElement.querySelector(".url-input");

if (!input) return;

navigator.clipboard.writeText(input.value)
    .then(() => {

        const originalHtml = button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        button.classList.add("copied");

        setTimeout(() => {

            button.innerHTML = originalHtml;

            button.classList.remove("copied");

        }, 1500);

    })
    .catch(error => {

        console.error("Copy failed:", error);

    });
```

}

// ================================
// TYPEWRITER
// ================================

document.addEventListener("DOMContentLoaded", function () {

```
const typedTextSpan =
    document.querySelector(".typed-text");

if (!typedTextSpan) return;

const textArray = [
    "Hi, Prakash 👋",
    "Welcome to Dashboard",
    "Manage Everything Faster"
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

let textArrayIndex = 0;
let charIndex = 0;


function type() {

    if (
        charIndex <
        textArray[textArrayIndex].length
    ) {

        typedTextSpan.textContent +=
            textArray[textArrayIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type, typingDelay);

    } else {

        setTimeout(erase, newTextDelay);

    }
}


function erase() {

    if (charIndex > 0) {

        typedTextSpan.textContent =
            textArray[textArrayIndex].substring(
                0,
                charIndex - 1
            );

        charIndex--;

        setTimeout(erase, erasingDelay);

    } else {

        textArrayIndex++;

        if (
            textArrayIndex >=
            textArray.length
        ) {

            textArrayIndex = 0;

        }

        setTimeout(
            type,
            typingDelay + 300
        );

    }
}


type();
```

});

// ================================
// WORLD CLOCK
// ================================

function updateWorldClock() {

```
const now = new Date();

const utcTime =
    document.getElementById("utcTime");

const jstTime =
    document.getElementById("jstTime");

const istTime =
    document.getElementById("istTime");


if (utcTime) {

    utcTime.textContent =
        now.toLocaleTimeString("en-GB", {
            timeZone: "UTC",
            hour12: false
        });

}


if (jstTime) {

    jstTime.textContent =
        now.toLocaleTimeString("en-GB", {
            timeZone: "Asia/Tokyo",
            hour12: false
        });

}


if (istTime) {

    istTime.textContent =
        now.toLocaleTimeString("en-GB", {
            timeZone: "Asia/Kolkata",
            hour12: false
        });

}
```

}

updateWorldClock();

setInterval(updateWorldClock, 1000);

// ================================
// WEATHER
// ================================

async function loadWeather() {

```
const loading =
    document.getElementById("weatherLoading");

const content =
    document.getElementById("weatherContent");

const error =
    document.getElementById("weatherError");


// Reset UI

if (loading) {
    loading.classList.remove("d-none");
}

if (content) {
    content.classList.add("d-none");
}

if (error) {
    error.classList.add("d-none");
}


// Check browser support

if (!navigator.geolocation) {

    showWeatherError(
        "Your browser does not support location services."
    );

    return;
}


// Check HTTPS / localhost

if (!window.isSecureContext) {

    showWeatherError(
        "Location requires HTTPS or localhost."
    );

    console.error(
        "Geolocation requires HTTPS or localhost."
    );

    return;
}


console.log(
    "Requesting user's location..."
);


navigator.geolocation.getCurrentPosition(

    // ============================
    // LOCATION SUCCESS
    // ============================

    async function (position) {

        const latitude =
            position.coords.latitude;

        const longitude =
            position.coords.longitude;


        console.log(
            "Location permission granted."
        );

        console.log(
            "Latitude:",
            latitude
        );

        console.log(
            "Longitude:",
            longitude
        );


        await fetchWeather(
            latitude,
            longitude
        );

    },


    // ============================
    // LOCATION ERROR
    // ============================

    function (error) {

        console.error(
            "Geolocation error:",
            error.code,
            error.message
        );


        switch (error.code) {

            case error.PERMISSION_DENIED:

                showWeatherError(
                    "Location permission was denied. Please allow location access and try again."
                );

                break;


            case error.POSITION_UNAVAILABLE:

                showWeatherError(
                    "Unable to determine your location."
                );

                break;


            case error.TIMEOUT:

                showWeatherError(
                    "Location request timed out. Please try again."
                );

                break;


            default:

                showWeatherError(
                    "Unable to get your location."
                );

        }

    },


    // ============================
    // LOCATION OPTIONS
    // ============================

    {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000
    }

);
```

}

// ================================
// FETCH WEATHER
// ================================

async function fetchWeather(
latitude,
longitude
) {

```
try {

    console.log(
        "Fetching weather..."
    );


    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
        `&timezone=auto`;


    const response =
        await fetch(weatherUrl);


    if (!response.ok) {

        throw new Error(
            `Weather API returned ${response.status}`
        );

    }


    const data =
        await response.json();


    console.log(
        "Weather API response:",
        data
    );


    updateWeather(data);


    // Get city / country

    await getLocationName(
        latitude,
        longitude
    );

}
catch (error) {

    console.error(
        "Weather API Error:",
        error
    );


    showWeatherError(
        "Unable to load weather information."
    );

}
```

}

// ================================
// UPDATE WEATHER CARD
// ================================

function updateWeather(data) {

```
if (
    !data ||
    !data.current
) {

    showWeatherError(
        "Weather data is unavailable."
    );

    return;
}


const current =
    data.current;


// Temperature

const temperature =
    document.getElementById(
        "weatherTemp"
    );

if (temperature) {

    temperature.textContent =
        `${Math.round(
            current.temperature_2m
        )}°C`;

}


// Feels like

const feelsLike =
    document.getElementById(
        "feelsLike"
    );

if (feelsLike) {

    feelsLike.textContent =
        `${Math.round(
            current.apparent_temperature
        )}°C`;

}


// Humidity

const humidity =
    document.getElementById(
        "humidity"
    );

if (humidity) {

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

}


// Wind

const windSpeed =
    document.getElementById(
        "windSpeed"
    );

if (windSpeed) {

    windSpeed.textContent =
        `${Math.round(
            current.wind_speed_10m
        )} km/h`;

}


// Weather condition

const weather =
    getWeatherDescription(
        current.weather_code
    );


const condition =
    document.getElementById(
        "weatherCondition"
    );

if (condition) {

    condition.textContent =
        weather.description;

}


// Weather icon

const icon =
    document.getElementById(
        "weatherIcon"
    );

if (icon) {

    icon.className =
        `fa-solid ${weather.icon}`;

}


// Show weather

const loading =
    document.getElementById(
        "weatherLoading"
    );

const error =
    document.getElementById(
        "weatherError"
    );

const content =
    document.getElementById(
        "weatherContent"
    );


if (loading) {
    loading.classList.add("d-none");
}

if (error) {
    error.classList.add("d-none");
}

if (content) {
    content.classList.remove("d-none");
}
```

}

// ================================
// GET CITY NAME
// ================================

async function getLocationName(
latitude,
longitude
) {

```
try {

    const url =
        `https://nominatim.openstreetmap.org/reverse` +
        `?lat=${latitude}` +
        `&lon=${longitude}` +
        `&format=json`;


    const response =
        await fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        });


    if (!response.ok) {

        throw new Error(
            "Location API failed."
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
                ? `${city}, ${country}`
                : city;

    }

}
catch (error) {

    console.error(
        "Reverse geocoding error:",
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
```

}

// ================================
// WEATHER DESCRIPTION
// ================================

function getWeatherDescription(code) {

```
const weatherMap = {

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

    56: {
        description: "Freezing Drizzle",
        icon: "fa-cloud-rain"
    },

    57: {
        description: "Heavy Freezing Drizzle",
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

    66: {
        description: "Freezing Rain",
        icon: "fa-cloud-rain"
    },

    67: {
        description: "Heavy Freezing Rain",
        icon: "fa-cloud-rain"
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

    77: {
        description: "Snow Grains",
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


return weatherMap[code] || {

    description: "Unknown",
    icon: "fa-cloud"

};
```

}

// ================================
// WEATHER ERROR
// ================================

function showWeatherError(message) {

```
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
    loading.classList.add("d-none");
}

if (content) {
    content.classList.add("d-none");
}

if (error) {
    error.classList.remove("d-none");
}

if (errorMessage) {

    errorMessage.textContent =
        message;

}
```

}

// ================================
// INITIALIZE WEATHER
// ================================

document.addEventListener(
"DOMContentLoaded",
function () {

```
    loadWeather();

}
```

);

// ================================
// REFRESH WEATHER
// Every 15 minutes
// ================================

setInterval(
loadWeather,
15 * 60 * 1000
);
