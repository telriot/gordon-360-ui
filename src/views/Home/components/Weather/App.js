//Written by Adam Princiotta
import React, { Component } from 'react';

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
        console.log("iconURL: ", this.state.icon)*/
  };

  render() {
    return (
      <div>
        <p>
          <img src={this.state.iconNow}></img>
        </p>
        <p>{this.state.temperatureNow} °</p>
        <p>{this.state.descriptionNow} </p>

        <img src={this.state.iconNext3}></img>
        <p>{this.state.temperatureNext3} °</p>
        <p>{this.state.descriptionNext3} </p>

        <img src={this.state.iconNext6}></img>
        <p>{this.state.temperatureNext6} °</p>
        <p>{this.state.descriptionNext6} </p>

        <img src={this.state.iconNext9}></img>
        <p>{this.state.temperatureNext9} °</p>
        <p>{this.state.descriptionNext9} </p>

        <img src={this.state.iconNext12}></img>
        <p>{this.state.temperatureNext12} °</p>
        <p>{this.state.descriptionNext12} </p>
      </div>
    );
  }
}

export default App;
