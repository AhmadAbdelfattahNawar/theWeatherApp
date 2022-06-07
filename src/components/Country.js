import React, { useState, useEffect } from "react";
import axios from "axios";
import { State } from "country-state-city";
import Weather from "./Weather";

function Country() {
  const [country, setCountry] = useState({
    name: "",
    code: "",
    city: "",
    latitude: "",
    longitude: "",
    error: "",
  });

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountry({
          ...Country,
          name: data.country_name,
          code: data.country_code,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      })
      .catch((err) => {
        setCountry({
          ...Country,
          error: err,
        });
      });
  };
  useEffect(() => {
    getGeoInfo();
  }, []);

  //get the cities from the allocated (country code)
  const citiesNamesObj = State.getStatesOfCountry(country.code);

  return (
    <div>
      <Weather
        lat={country.latitude}
        lon={country.longitude}
        countryName={country.name}
        cityName={country.city}
        citiesNamesObj={citiesNamesObj}
      />
    </div>
  );
}

export default Country;
