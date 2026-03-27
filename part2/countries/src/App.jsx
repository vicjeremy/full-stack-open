import { useState, useEffect } from 'react'
import axios from 'axios'

const DataCountry = ({filter, weather}) => {
    return (
      filter.map(data =>(
        <div key={data.name.common}>
          <h1>{data.name.common}</h1>
          <p>Capital {data.capital}</p>
          <p>Area {data.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(data.languages).map((lang) =>{
              return <li key={lang}>{lang}</li>
            })}
          </ul>
          <img src={data.flags.png} alt={data.flags.alt} />

          {weather.main ?
        <div>
          <h2>Weather in {filter[0].capital}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
        : <p>No weather data available</p>
      }
        </div>
      ))
    )
  }

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const api = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
        .catch((error) => console.log(error.message));
  }, [])

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

  useEffect(() => {
    if (filtered.length !== 1) return
      const loc = filtered[0].capital[0]
      setWeather([])
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${api}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch((error) => console.log(error.message));
  }, [filtered.length])
  
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
        find countries: <input value={value} onChange={handleChange} />
      <div>
        <br />
        {
          value.length < 1 ? <p>Start typing to search...</p> 
          :  filtered.length > 10 
          ? <p>Too many matches, specify another filter</p>
          : filtered.length === 1 
          ? <DataCountry filter={filtered} weather={weather}/> 
          
          :filtered.map(country => (
              <p key={country.name.common}>{country.name.common} <button onClick={() => setValue(country.name.common)} >Show</button></p>
            ))
        }
      </div>
    </div>
  )
}

export default App