import axios from 'axios'

const baseUrl = 'https://api.weatherapi.com/v1'

const getCurrentWeather = (city) => {
    const apiKey = import.meta.env.VITE_SOME_KEY
    const request = axios.get(`${baseUrl}/current.json?key=${apiKey}&q=${city}&aqi=no`)

    return request.then(response => response.data)
}

export default { getCurrentWeather }
