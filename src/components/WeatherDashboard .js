import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import WeatherDetails from "./WeatherDetails";
import weatherImg from "./weather.png"

const WeatherDashboard = () => {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName) {
      setError("City name cannot be empty");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: cityName,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
          },
        }
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching weather data");
      setWeather(null);
    }
  };

  // Create a debounced version of fetchWeather using useCallback to memoize it
  const debouncedFetchWeather = useCallback(
    debounce((cityName) => fetchWeather(cityName), 500),
    []
  );

  const handleFetchWeather = () => {
    setClicked(true);
    fetchWeather(city);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    debouncedFetchWeather(newCity);
  };

  useEffect(() => {
    fetchWeather("New Delhi");
  }, []);

  return (
    <div className="weather-dashboard">
      <img src={weatherImg} alt="Congratulations GIF" />
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
      />
      <button onClick={handleFetchWeather}>Check Weather</button>
      {clicked && weather && <WeatherDetails weather={weather} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherDashboard;
