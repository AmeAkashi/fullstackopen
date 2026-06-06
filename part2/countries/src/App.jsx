import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryView from './components/CountryView'
import Notification from './components/Notification'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
    const [countries, setCountries] = useState([])
    const [view, setView] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [weather, setWeather] = useState(null)

    const getWeatherData = (city) => {
        weatherService
            .getCurrentWeather(city)
            .then(data => setWeather(data))
            .catch(error => {
                setErrorMsg(`Weather API: ${error.message}`)
                setWeather(null)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)
            })
    }

    useEffect(() => {
        countryService
            .getAll()
            .then(data => {
                setCountries(data)
            })
            .catch(error => {
                setErrorMsg(`Country API: ${error.message}`)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)
            })
    }, [])

    useEffect(() => {
        if (view.length === 1) {
            const countryInfo = countries
            .find(country => country.name.common === view[0])

            getWeatherData(countryInfo.capital[0])
        }
    }, [countries, view])

    const handleFilterChange = (event) => {
        const searchPattern = new RegExp(event.target.value.toLowerCase())
        const list = countries.map(country => country.name.common)
        setView(list.filter(country => searchPattern.test(country.toLowerCase())))
    }

    const handleShow = (name) => {
        setView([name])
    }



    return (
        <div>
            <Notification error={errorMsg} />
            <Filter onChange={handleFilterChange} />
            <CountryView
                names={view}
                data={countries}
                handleShow={handleShow}
                weatherData = {weather}
            />
        </div>
    )
}

export default App
