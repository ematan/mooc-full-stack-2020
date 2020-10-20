import React, {useState, useEffect} from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
console.log(api_key)

const CName = ({name, setNewFilter}) => {
  return (
    <p>{name} <CountryButton name={name} setNewFilter={setNewFilter}/></p>
  )
}

const CountryButton = ({name, setNewFilter}) => {
  return (
    <button onClick={() => setNewFilter(name)}>show</button>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital} <br />
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="100" border="2px solid"></img>
      <Weather country={country} />

    </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)
  const params = {
    access_key: api_key,
    query: country.capital
  }
  const getWeather = () => {
    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
      console.log(apiResponse);
      setWeather(apiResponse)
    }).catch(error => {
      console.log(error);
    })
  }
  useEffect(getWeather, [])

  if (!weather) {
    return (
      <div>"Loading weather"</div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <b>Tempreature: </b>{weather.current.temperature} Celcius<br />
        <img src={weather.current.weather_icons[0]} size='100' alt='weather icon'></img><br/>
        <b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    )
  }
}


const Display = ({countries, filter, setNewFilter}) =>{

  function filterCountries(list, fil) {
    return list.filter(c => c.name.toLowerCase().includes(fil.toLowerCase()))
  }
  const filteredList = filterCountries(countries, filter)

  if (filteredList.length > 10) {
      return "Too many matches"
  } else if (filteredList.length > 1) {
      return filteredList.map(c => <CName key={c.name} name={c.name} setNewFilter={setNewFilter}/>)
  } else if (filteredList.length === 1) {
      return filteredList.map(c => <Country key={c.name} country={c} />)
  } else {
      return "No matches :("
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <p>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </p>
      <div>
        <Display countries={countries} filter={newFilter} setNewFilter={setNewFilter} />
      </div>

    </div>
  );
}

export default App;
