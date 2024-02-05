import "./App.css";
import { useState } from "react";
import './index.css';

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState();

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6243aaf48b62471c43490a0d129cb8dc&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.log(error.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWeather();
  };

  return (
    <div className="app flex flex-col items-center">
      <h1 className="py-4 text-5xl text-white font-serif">Search Weather</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            className="px-4 py-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="px-4 py-3 bg-purple-500 text-white">
            Search
          </button>
        </form>
      </div>

      {weather && (
        <div className="card bg-purple-500 text-white w-[220px] h-[350px] flex flex-col justify-center items-center mt-10">
          <h4 className="text-2xl">{weather.name}</h4>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt=""
            className="w-[150px]"
          />
          <h2 className="text-5xl font-bold mb-2">{weather.main.temp}&deg;</h2>
          <p>{weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;