import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Link } from "react-router-dom";
// import useGeoLocation from './useGeoLocation '

function Weather({ lat, lon, countryName, cityName, citiesNamesObj }) {
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [feel, setFeel] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempDay1, setTempDay1] = useState("");

  // const [cityTemp, setCityTemp] = useState([]);

  useEffect(() => {
    // getData();
    axios
      .get(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${countryName}&key=e29313cdbf344aa48d8225413222605&format=json`
      )
      .then((res) => {
        const data = res.data;

        setIcon(data.data.current_condition[0].weatherIconUrl[0].value);
        setDesc(data.data.current_condition[0].weatherDesc[0].value);
        setFeel(data.data.current_condition[0].FeelsLikeC);
        setHumidity(data.data.current_condition[0].humidity);
        setTempDay1(data.data.weather[0].avgtempC);
      })
      .catch((err) => console.log(err));
  }, [countryName]);

  return (
    <div>
      {
        //useGeolocation implementation
        //{location.loaded ? JSON.stringify(location):"Location data not available yet"}
        // <div> {location.coordinates.lat}</div>
        // <div> {location.coordinates.lon}</div>
        // <div>
        //     {location}
        // </div>
      }

      <div className="total">
        <div className="weatherPart">
          <div className="wrapper">
            <header>Weather App</header>
            <section className="input-part">
              <p className="info-txt"></p>
              <div className="content"></div>
            </section>
            <section className="weather-part">
              <img src={icon} alt="Weather Icon" />
              <div className="temp">
                <span className="numb">{tempDay1}</span>
                <span className="deg">°</span>C
              </div>
              <div className="weather">{desc}</div>
              <div className="location">
                <h3>
                  <Icon icon="bx:map" />
                  <span>{countryName}</span>
                </h3>
              </div>
              <div className="bottom-details">
                <div className="column feels">
                  <Icon
                    icon="wi:thermometer"
                    color="#5dbbff"
                    width="60"
                    height="60"
                  />
                  <div className="details">
                    <div className="temp">
                      <span className="numb-2">{feel}</span>
                      <span className="deg">°</span>C
                    </div>
                    <p>Feels like</p>
                  </div>
                </div>
                <div className="column humidity">
                  <Icon
                    icon="carbon:humidity"
                    color="#5dbbff"
                    width="60"
                    height="60"
                  />
                  <div className="details">
                    <span>{humidity}</span>
                    <p>Humidity</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="citiesPart">
          <ul>
            {citiesNamesObj.map((e) => (
              <Link
                to={`/cities/${e.isoCode}`}
                key={e.isoCode}
                state={{ cityName: e.name, cityLat: lat, cityLon: lon }}
              >
                <li>{e.name}</li>{" "}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Weather);
