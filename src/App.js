import React, {useState} from 'react';
import './App.css';


function App() {
  const api = {
    key: "5130830e45c81fdc7596150106d37b8c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  let time = String(new window.Date())     
  let date = time.slice(0,15)

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})

  const search = () => {
    // if(e.key === "Enter") {
     fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setWeather(data);
        setCity('');
      }
      )
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    search()
  }

  // const searchButton = () => {
  //   fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
  //   .then(res => res.json())
  //   .then(data => {
  //       console.log(data);
  //       setWeather(data);
  //       setCity('');
  //     }
  //   )
  // }


  return (
    <div className={
      (typeof weather.main != "undefined")
      ? (       
        (weather.main.temp >16) ? 'app warm'
        :(weather.main.temp > 5) ? 'app cool'
        : 'app cold'
      )
      : 'app'
    }>
      <main>
        <form className="search-container"
              onSubmit={handleSubmit}
                  >
          <input type="text"
                  className="search-bar"
                  placeholder="City ..."
                  onChange={e => setCity(e.target.value)}
                  value={city}
          />
          <button className="button"
                  type="submit"
                // onClick={searchButton}
                >
                   Search
          </button>
        </form>
        {
        (typeof weather.main != "undefined") 
        ? (
        <div className="info-container">
          <div className="location-container">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
                {date}
            </div>
          </div>
          <div className="weather-container">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
              </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
          )         
          : ( weather.cod ==="404") ? 
            <div className="err-msg-wrap">
              <p className="err-msg">City is not found ...</p>
            </div>
          :   
            <p className="msg">Please select a city ...</p>
      }
      </main>
    </div>
  );
}

export default App;
