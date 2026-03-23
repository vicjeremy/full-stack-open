import { useState, useEffect } from 'react'
import axios from 'axios'

const DataCountry = ({filter}) => {
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
        </div>
      ))
    )
  }


const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
        .catch((error) => console.log(error.message));
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

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
          ? <DataCountry filter={filtered}/>
          :filtered.map(country => (
              <p key={country.name.common}>{country.name.common} <button onClick={() => setValue(country.name.common)} >Show</button></p>
            ))
        }
      </div>
    </div>
  )
}

export default App