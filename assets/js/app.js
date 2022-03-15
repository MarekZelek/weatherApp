let weatherForm = document.querySelector('.weather-form')
let apiURL = "https://api.weatherapi.com/v1/forecast.json?key=55b946a7250c49ad927124617221203&days=7&q="
let apiDataContainer = document.querySelector('.api-data')
let loader = document.querySelector('.loader')


weatherForm.addEventListener('submit', (event) => {
    showLoader();
    let userCity = document.querySelector('.city').value
    let userApiURL = apiURL + userCity

    fetch(userApiURL)
        .then(response => {

            if (response.status === 200) {
                return response.json()
            }
            else {
                return showError()
            }
        })
        .then((dataFromAPI) => {

            hideLoader();
            // console.log(dataFromAPI.current.condition.text)
            let view = '';
            view += `<div class="main-info">`


            // icon
            view += `<div class="icon">`
            view += `<img src="${dataFromAPI.current.condition.icon}" alt="${dataFromAPI.current.condition.text}">`
            view += `</div>`

            // degrees
            view += `<div class="degrees">`
            view += `${dataFromAPI.current.temp_c} <span><sup>o</sup>C</span> `
            view += `</div>`

            // INFO
            view += `<div class="info">
                    <p>The amount of rainfall: ${dataFromAPI.current.precip_mm}mm </p>
                    <p>Humidity: ${dataFromAPI.current.humidity}%</p>
                    <p>Wind: ${dataFromAPI.current.wind_kph}km/h</p>
                </div>`;

            view += `</div>`

            // FORECAST
            view += `<div class="days">`
            dataFromAPI.forecast.forecastday.forEach((day) => {
                view += `<div class="day">`

                view += `<div class="date">${day.date}</div>`
                view += `<div class="icon"><img src="${day.day.condition.icon}" alt=""></div>`
                view += `<div class="avgTemp">${day.day.avgtemp_c}<sup>o</sup>C</div>`

                view += `</div>`
            })
            view += `</div>`

            apiDataContainer.innerHTML = view;
        })

    event.preventDefault()

})

let showLoader = () => {
    loader.style.display = 'block'
}

let hideLoader = () => {
    loader.style.display = 'none'
}

let showError = () => {
    apiDataContainer.innerHTML = `
    <div class = "error"> Sorry, this is not the city you are looking for! Or it's just problem with our API:) Try again.
    </div>`

}