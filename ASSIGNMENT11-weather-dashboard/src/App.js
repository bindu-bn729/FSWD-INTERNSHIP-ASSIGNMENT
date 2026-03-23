import React, { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {

    if(city.trim() === ""){
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b85029af15fa2432f2aee7d4335efa59&units=metric`
      );

      if(!response.ok){
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

    } catch(err){
      setError(err.message);
    }

    setLoading(false);
  };

  return (

    <div style={styles.container}>

      <h1>Weather Dashboard</h1>

      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />

        <button style={styles.button} onClick={getWeather}>
          Search
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {error && <p style={{color:"red"}}>{error}</p>}

      {weather && (
        <div style={styles.card}>

          <h2>{weather.name}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <h3>{weather.main.temp}°C</h3>

          <p>{weather.weather[0].description}</p>

        </div>
      )}

    </div>
  );
}

const styles = {

  container:{
    textAlign:"center",
    minHeight:"100vh",
    background:"linear-gradient(135deg,#74ebd5,#ACB6E5)",
    paddingTop:"80px",
    fontFamily:"Arial"
  },

  searchBox:{
    marginBottom:"20px"
  },

  input:{
    padding:"10px",
    fontSize:"16px",
    borderRadius:"5px",
    border:"none",
    marginRight:"10px"
  },

  button:{
    padding:"10px 20px",
    fontSize:"16px",
    border:"none",
    borderRadius:"5px",
    background:"#333",
    color:"white",
    cursor:"pointer"
  },

  card:{
    width:"250px",
    margin:"auto",
    background:"white",
    padding:"20px",
    borderRadius:"12px",
    boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
  }

};

export default App;