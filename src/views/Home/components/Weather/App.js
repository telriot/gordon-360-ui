//Written by Adam Princiotta
import React, { Component } from 'react';
import './App.css';

//const API_KEY = '6b9cd1d2df6ce413584eb076deea6888';

class App extends React.Component {
  state = {
    temperature: undefined,
    description: undefined,
    icon: undefined,
  };

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    //console.log('getting weather');
    const API_CALL = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=4954801&APPID=6b9cd1d2df6ce413584eb076deea6888`,
    );
    const data = await API_CALL.json();
    //console.log("This is the data:", data);

    //names are a bit messy, but it takes data in incrememnts of 3 hours
    this.setState({
      temperatureNow: Math.floor(((data.list[0].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNow: data.list[0].weather[0].description,
      iconNow: `http://openweathermap.org/img/wn/` + data.list[0].weather[0].icon + `@2x.png`,
      temperatureNext3: Math.floor(((data.list[1].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext3: data.list[1].weather[0].description,
      iconNext3: `http://openweathermap.org/img/wn/` + data.list[1].weather[0].icon + `@2x.png`,
      temperatureNext6: Math.floor(((data.list[2].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext6: data.list[2].weather[0].description,
      iconNext6: `http://openweathermap.org/img/wn/` + data.list[2].weather[0].icon + `@2x.png`,
      temperatureNext9: Math.floor(((data.list[3].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext9: data.list[3].weather[0].description,
      iconNext9: `http://openweathermap.org/img/wn/` + data.list[3].weather[0].icon + `@2x.png`,
      temperatureNext12: Math.floor(((data.list[4].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext12: data.list[4].weather[0].description,
      iconNext12: `http://openweathermap.org/img/wn/` + data.list[4].weather[0].icon + `@2x.png`,
    });
    /*console.log("temp: ", this.state.temperature)
        console.log("description: ", this.state.description)
        console.log("iconURL: ", this.state.icon)
        
        
        <img src={this.state.iconNext9}></img>
        <div3>{this.state.temperatureNext9}°</div3>
        <div3>{this.state.descriptionNext9}</div3>

        <img src={this.state.iconNext12}></img>
        <div3>{this.state.temperatureNext12}°</div3>
        <div3>{this.state.descriptionNext12}</div3>
        */
  };

  render() {
    return (
      <div3>
        <img1>
          <img src={this.state.iconNow}></img>
        </img1>
        <div3>{this.state.temperatureNow}°</div3>
        <div3>{this.state.descriptionNow}</div3>

        <img2>
          <img src={this.state.iconNext3}></img>
        </img2>
        <div3>{this.state.temperatureNext3}°</div3>
        <div3>{this.state.descriptionNext3}</div3>

        <img src={this.state.iconNext6}></img>
        <div3>{this.state.temperatureNext6}°</div3>
        <div3>{this.state.descriptionNext6}</div3>
      </div3>
    );
  }
}

export default App;
