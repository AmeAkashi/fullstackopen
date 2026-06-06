const BasicInfo = ({ countryName, countryInfo }) => {
    return (
        <div>
            <h1>{countryName}</h1>
            <p>
                Capital: {countryInfo.capital.map((city, index) => {
                    return (index === 0 ? `${city}` : ` --- ${city}`)
                })}
            </p>
            <p>Area: {countryInfo.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(countryInfo.languages).map(language => {
                    return <li key={language[0]}>{language[1]}</li>
                })}
            </ul>
            <img
                className="flag"
                src={countryInfo.flags.svg}
                alt={countryInfo.flags.alt}
            />
        </div>
    )
}

const WeatherInfo = ({ capital, weatherData }) => {
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weatherData.current.temp_c} ℃</p>
            <img
                src={`https:${weatherData.current.condition.icon}`}
                alt={weatherData.current.condition.text}
            />
            <p>Wind: {weatherData.current.wind_kph} km/h</p> 
        </div>
    )
}

const SingleView = ({ countryName, countryInfo, weatherData }) => {
    if (weatherData === null) {
        return (
            <BasicInfo
                countryName={countryName}
                countryInfo={countryInfo}
            />
        )
    }

    return (
        <div>
            <BasicInfo
                countryName={countryName}
                countryInfo={countryInfo}
            />
            <WeatherInfo
                capital={countryInfo.capital[0]}
                weatherData={weatherData}
            />
        </div>
    )
}

const Country = ({ name, handleShow }) => {
    return (
        <p>
            {name}
            <button onClick={() => handleShow(name)}>
                Show
            </button>
        </p>
    )
}

const CountryView = ({ names, data, handleShow, weatherData }) => {
    if (names.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (names.length === 1) {
        const countryInfo = data.find(country => country.name.common === names[0])

        return (
            <SingleView
                countryName={names[0]}
                countryInfo={countryInfo}
                weatherData={weatherData}
            />
        )
    }

    return (
        <div>
            {names.map(country => {
                return (
                    <Country
                        key={country}
                        name={country}
                        handleShow={handleShow}
                    />
                )
            })}
        </div>
    )
}

export default CountryView
