import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import * as d3 from "d3";
function CitiesWeather(props) {
  const location = useLocation();
  const { cityName } = location.state;
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [feel, setFeel] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempDay1, setTempDay1] = useState("");
  const [tempDay2, setTempDay2] = useState("");
  const [tempDay3, setTempDay3] = useState("");
  const [tempDay4, setTempDay4] = useState("");

  const [dateDay1, setDateDay1] = useState("");
  const [dateDay2, setDateDay2] = useState("");
  const [dateDay3, setDateDay3] = useState("");
  const [dateDay4, setDateDay4] = useState("");
  const svgRef = useRef();

  useEffect(() => {
    axios
      .get(
        ////////////////////
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${cityName}&key=e29313cdbf344aa48d8225413222605&format=json`
      )
      .then((res) => {
        const theData = res.data;
        setIcon(theData.data.current_condition[0].weatherIconUrl[0].value);
        setDesc(theData.data.current_condition[0].weatherDesc[0].value);
        setFeel(theData.data.current_condition[0].FeelsLikeC);
        setHumidity(theData.data.current_condition[0].humidity);
        setTempDay1(theData.data.weather[0].avgtempC);
        setTempDay2(theData.data.weather[1].avgtempC);
        setTempDay3(theData.data.weather[2].avgtempC);
        setTempDay4(theData.data.weather[3].avgtempC);

        setDateDay1(theData.data.weather[0].date);
        setDateDay2(theData.data.weather[1].date);
        setDateDay3(theData.data.weather[2].date);
        setDateDay4(theData.data.weather[3].date);

        //Chart
        //1)setting up svg
        const w = 350;
        const h = 80;
        const svg = d3
          .select(svgRef.current)
          .attr("width", w)
          .attr("height", h)
          .style("background", "#d3d3d3")
          .style("margin-top", "50")
          .style("overflow", "visible");

        //2) setting the scaling
        const xScale = d3
          .scaleLinear()
          .domain([0, 4 - 1]) //start from 0 till last element
          .range([0, w]);

        const yScale = d3 // y inverted as we start fom to left
          .scaleLinear()
          .domain([0, h])
          .range([h, -70]);
        //line generating
        const generateScaledLine = d3
          .line()
          .x((d, i) => xScale(i))
          .y(yScale)
          .curve(d3.curveCardinal);

        //3) setting the axis المحاور
        const xAsis = d3
          .axisBottom(xScale)
          .ticks(4) //التدريج
          .tickFormat((i) => [dateDay1, dateDay2, dateDay3, dateDay4][i]); //المسافة بين كل تك والتانية )(التكة بواحد)

        const yAxis = d3 //5 تكات
          .axisLeft(yScale)
          .ticks(5);
        svg
          .append("g") //هنظهر الاكس اكسز
          .call(xAsis)
          .attr("transform", `translate(0,${h})`); //الاكس دايما بيظهر فوق هنا بنزله تحت

        svg
          .append("g") //هنظهر ال واي اكسس
          .call(yAxis);
        //4) setting up the data for svg
        svg
          .selectAll(".line")
          .data([[tempDay1, tempDay2, tempDay3, tempDay4]]) //path in the data  الرسم نفسه
          .join("path")
          .attr("d", (d) => generateScaledLine(d))
          .attr("fill", "none")
          .attr("stroke", "black");
      })
      .catch((err) => console.log(err));
  }, [
    cityName,
    tempDay1,
    tempDay2,
    tempDay3,
    tempDay4,
    dateDay1,
    dateDay2,
    dateDay3,
    dateDay4,
  ]);

  return (
    <div>
      <div className="total">
        <div className="weatherPart ">
          <div className="wrapper">
            <header>Cities Weather</header>
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
                  <span>{cityName}</span>
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
        <div className="chartPart ">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CitiesWeather);
