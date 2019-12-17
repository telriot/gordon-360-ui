//Written by Adam Princiotta and John Chan
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends React.Component {
  state = {
    temperature: undefined,
    description: undefined,
    icon: undefined,
  };

  //runs getWeather() when App loads
  componentDidMount() {
    this.getWeather();
  }

  //Makes the API call and stores the temperature, description of weather, and icon for 4 times of
  //the day
  getWeather = async () => {
    const API_CALL = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=4954801&APPID=6b9cd1d2df6ce413584eb076deea6888`,
    );
    const data = await API_CALL.json();
    //names are a bit messy, but it takes data in incrememnts of 3 hours
    this.setState({
      temperatureNow: Math.round(((data.list[0].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNow: data.list[0].weather[0].description,
      iconNow: `http://openweathermap.org/img/wn/` + data.list[0].weather[0].icon + `@2x.png`,

      temperatureNext3: Math.round(((data.list[1].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext3: data.list[1].weather[0].description,
      iconNext3: `http://openweathermap.org/img/wn/` + data.list[1].weather[0].icon + `@2x.png`,

      temperatureNext6: Math.round(((data.list[2].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext6: data.list[2].weather[0].description,
      iconNext6: `http://openweathermap.org/img/wn/` + data.list[2].weather[0].icon + `@2x.png`,

      temperatureNext9: Math.round(((data.list[3].main.temp - 273.15) * 9) / 5 + 32),
      descriptionNext9: data.list[3].weather[0].description,
      iconNext9: `http://openweathermap.org/img/wn/` + data.list[3].weather[0].icon + `@2x.png`,
    });
  };

  render() {
    return (
      <div3>
        <Grid container spacing={4} direction="row" justify="center">
          <Grid item auto>
            <img src={this.state.iconNow}></img>

            <Grid item auto>
              <div4>{this.state.temperatureNow}°</div4>
              <div4>{this.state.descriptionNow}</div4>
            </Grid>
          </Grid>

          <Grid item auto>
            <img src={this.state.iconNext3}></img>

            <Grid item auto>
              <div4>{this.state.temperatureNext3}°</div4>
              <div4>{this.state.descriptionNext3}</div4>
            </Grid>
          </Grid>

          <Grid item auto>
            <img src={this.state.iconNext6}></img>

            <Grid item auto>
              <div4>{this.state.temperatureNext6}°</div4>
              <div4>{this.state.descriptionNext6}</div4>
            </Grid>
          </Grid>

          <Grid item auto>
            <img src={this.state.iconNext9}></img>
            <Grid item auto>
              <div3>{this.state.temperatureNext9}°</div3>
              <div3>{this.state.descriptionNext9}</div3>
            </Grid>
          </Grid>
        </Grid>
      </div3>
    );
  }
}

export default App;
