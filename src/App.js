import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [query, setQuery] = useState('Pune')

  const fetching = async (cityName) => {
    const res = await fetch(`http://api.weatherstack.com/current?access_key=c08d0ddca508f6bd7a44836b2c4b4676&query=${cityName}`)
    const data = await res.json();
    setData(data);
  }

  const HandelSearch = () => {
    fetching(query)
    setQuery('')
  }

  useEffect(() => {
    fetching(query)
  }, [])

  return (
    <div className='main'>
      <div className="content">
        <div className='heading'>
          <h1>Weather App</h1>
        </div>
        <div className='search' >
          <input type="text" placeholder='Enter city'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="submit" value={"Search"}
            onClick={HandelSearch} />
        </div>

        <div className='info'>
          <div className='Name'>Weather in {data?.request?.query}</div> <br />
          <div className='temp'>{data?.current?.temperature}°C </div>
          <div className='img'><img src={data?.current?.weather_icons} alt="img" /> </div>  <br />
          <div className='descriptions'>{data?.current?.weather_descriptions[0]}</div>  <br />
          <div className='time'>Date: {data?.location?.localtime}</div> <br />
          <div className='Humidity'>Humidity:{data?.current?.humidity}%</div>  <br />
          <div className='region'>Region: {data?.location?.region}</div>  <br />
          <div className='Pressure'>Pressure : {data?.current?.pressure}mBar </div>
          <div className='visibility'>visibility: {data?.current?.visibility}Km </div>

        </div>
      </div>
    </div>

  );
}

export default App;
