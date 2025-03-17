import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "4892da361c9d5fdd4d6b2567f430c61b";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  const getBackgroundImage = () => {
    if (!weather) {
      return "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop')";
    }

    const temp = weather.main.temp;

    if (temp < 0) {
      return "url('https://images.unsplash.com/photo-1549562969-349ced0da61a?q=80&w=1974&auto=format&fit=crop')";
    } else if (temp >= 0 && temp <= 15) {
      return "url('https://images.unsplash.com/photo-1618995293724-af5119646c58?q=80&w=2070&auto=format&fit=crop')";
    } else if (temp > 15 && temp <= 30) {
      return "url('https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=2070&auto=format&fit=crop')";
    } else {
      return "url('https://images.unsplash.com/photo-1586902197503-e71026292412?q=80&w=2072&auto=format&fit=crop')";
    }
  };

  useEffect(() => {
    const backgroundImage = getBackgroundImage();
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background 0.5s ease-in-out";
  }, [weather]);

  return (
    <div className="app">
      <h1>🌍 Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country} 📍</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁ Weather: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
