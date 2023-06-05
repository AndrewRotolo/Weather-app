//Openweather API key
const weatherKey = "16867340404d3e74af4e4ef85cf2e753";
//Form where user searches for their location
const searchFormEl = document.querySelector('#search-form');

let searches;

//determines the latitude and longitude that will be used for the search since the built-in geolocator doesn't work anymore
function geolocate(event) {
    event.preventDefault();

    //clears any previous weather results
    document.querySelector('#forecast').innerHTML = "";

    const searchVal = document.querySelector('#search-input').value;
    const searchURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchVal}&limit=1&appid=${weatherKey}`;

    fetch(searchURL)
        .then((response) => {

            return response.json();
        }).then((data) => {
            // console.log(data[0].lat)
            //takes latitude/longitude data from the geolocation API
            const lat = data[0].lat;
            const lon = data[0].lon;

            const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;


            //this function actually utilizes the latitude and longitude. I hate to have nested fetch operations, but I don't see a way around it.
            fetch(forecastURL)
                .then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data.list[0].weather[0].main);
                    for (let i = 0; i <= 4; i++) {
                        
                        let icon;

                        console.log(data.list[i].weather[0].main)
                        //chooses the icons that correspond to the weather
                        switch (data.list[i].weather[0].main) {
                            case "Thunderstorm":
                                icon = 'thunder.png'
                                break;
                            case "Drizzle":
                            case "Rain":
                                icon = 'rain.png'
                                break;
                            case "Snow":
                                icon = "snow.png"
                                break
                            case "Mist":
                            case "Smoke":
                            case "Haze":
                            case "Dust":
                            case "Fog":
                            case "Sand":
                            case "Ash":
                            case "Squall":
                            case "Tornado":
                                icon = "atmosphere.png"
                                break;
                            case "Clear":
                                icon = 'clear.png'
                                break;
                            case "Clouds":
                                icon = "clouds.png"
                                break;
                            default:
                                console.log('Oops')
                        }

                        let iconEL = document.createElement('img');
                        iconEL.setAttribute("src", "./assets/media/" + icon);
                        document.querySelector('#forecast').appendChild(iconEL);
                    }

                    //adds the search history to local storage
                    localStorage.setItem(`history`, searchVal);
                    searchHistory()

                })
        })

}

//adds past searches to the HTML
function searchHistory() {

    const lastSearch = localStorage.getItem('history')

    if (!lastSearch) {
        document.querySelector('#history').innerHTML = "";

    } else {
        document.querySelector('#history').innerHTML = `Previous search: ${lastSearch}`;
}
}
searchHistory()

//event listener to initiate the search
searchFormEl.addEventListener('submit', geolocate);