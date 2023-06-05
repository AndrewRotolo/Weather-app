const weatherKey = "16867340404d3e74af4e4ef85cf2e753";
const searchFormEl = document.querySelector('#search-form');

//determines the latitude and longitude that will be used for the search since the built-in geolocator doesn't work anymore
function geolocate(event) {
    event.preventDefault();

    const searchVal = document.querySelector('#search-input').value;
    const searchURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchVal}&limit=1&appid=${weatherKey}`;

    fetch(searchURL)
        .then(function (response) {

            return response.json();
        }).then((data) => {
            // console.log(data[0].lat)
            const lat = data[0].lat;
            const lon = data[0].lon;

            const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;


            //this function actually utilizes the latitude and longitude. I hate to have nested fetch operations, but I don't see a way around it.
            fetch(forecastURL)
                .then(function (response) {
                    return response.json()
                }).then((data) => {
                    console.log(data);
                })
        })

}

//event listener to initiate the search
searchFormEl.addEventListener('submit', geolocate);