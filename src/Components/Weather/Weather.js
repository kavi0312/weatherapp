import React, { useEffect } from "react";
import { useState } from "react";
import "./Weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("Delhi");
  const[noData,setNoData]=useState("");
  useEffect(() => {
    const fetchapi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a20411f87ee1f1225fcde9a86793c032`;
      const res = await fetch(url);
      const resjson = await res.json();
	  console.log(resjson);
	  if(resjson.main){
		  setNoData("");
      setCity(resjson.main);
	  }
	 else{
    setNoData('No record found')
	 }		 
    };
    fetchapi();
  }, [search]);

  return (
    <>
      <div>
        <div><h1>Weather Forecast App</h1>
          <input
            className="input" placeholder="Enter city name" defaultValue="Delhi"
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
			  if(e.target.value===''){
			  setCity("");
			  }
            }}
          />
        </div>
        {!city ? (
          <p>{noData}</p>
        ) : (
          <div>
            <h1>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              {search}
            </h1>
            <div className="info">
              <h2>{city.temp}°C</h2>
              Min:{city.temp_min}°C | Max :{city.temp_max}°C | Humidity :
              {city.humidity}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default WeatherApp;
