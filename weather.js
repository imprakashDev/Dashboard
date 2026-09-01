async function loadWeather() {

    const loading = document.getElementById("weatherLoading");
    const content = document.getElementById("weatherContent");
    const error = document.getElementById("weatherError");
    const errorMessage = document.getElementById("weatherErrorMessage");

    // Reset UI
    loading.classList.remove("d-none");
    content.classList.add("d-none");
    error.classList.add("d-none");

    if (!navigator.geolocation) {

        showWeatherError(
            "Geolocation is not supported by your browser."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            try {

                /*
                 * Open-Meteo Weather API
                 */
                const weatherUrl =
                    `https://api.open-meteo.com/v1/forecast` +
                    `?latitude=${latitude}` +
                    `&longitude=${longitude}` +
                    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
                    `&timezone=auto`;

                const response = await fetch(weatherUrl);

                if (!response.ok) {
                    throw new Error("Weather API request failed.");
                }

                const data = await response.json();

                updateWeather(data, latitude, longitude);

            }
            catch (err) {

                console.error("Weather API Error:", err);

                showWeatherError(
                    "Unable to load weather data."
                );
            }

        },

        function (error) {

            console.error("Location Error:", error);

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    showWeatherError(
                        "Please allow location access to show weather."
                    );
                    break;

                case error.POSITION_UNAVAILABLE:
                    showWeatherError(
                        "Your location could not be determined."
                    );
                    break;

                case error.TIMEOUT:
                    showWeatherError(
                        "Location request timed out."
                    );
                    break;

                default:
                    showWeatherError(
                        "Unable to get your location."
                    );
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}