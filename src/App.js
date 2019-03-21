import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weatherpic from './Weatherpic';
import Button from './Button';


class App extends Component {
  constructor() {
    super();
    this.state = {
        items: {},
        IsLoaded:true,
        
    };
}


componentDidMount = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    this.getWeather(latitude, longitude);
  });
};


getWeather = (latitude, longitude) => {
  const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(api)
    .then(response => {
      if (response.ok) {
        return response
      }
      else { 
        let error = new Error(`Error ${response.status} is ${response.statusText}`);
        throw error;
      }
     })
    .then(response => response.json())
    .then(data => {
      this.setState({
        locationName: data.name,
        fara: data.main.temp,
        weatherDescription: data.weather[0].description,
        IsLoaded: false,
        displayingCelcius: false
      });
    })
    .catch(error => { 
      alert(`Data could not be fetched ${error.message}`)
    });
};

convertFToC = (tempInF) => {
  return (tempInF - 32) * 5/9;
}

  render() {
    const { locationName, fara, weatherDescription, IsLoaded, displayingCelcius} = this.state;
    
    return (
      IsLoaded ? (<h1>Loading....</h1>):
        (<div className="d-flex flex-column align-items-center">
        <h1 className="text-success">Weather App</h1>
              <h3 className="col-12 text-danger">{locationName}</h3>
              {/* 2. if displaying celcius is true runs convertFToC() and converts to celcuis else fara from state */}
              <h3 className="col-12 text-danger">{displayingCelcius ? this.convertFToC(fara) +"C" : fara +"F"}</h3>
              
              <h3 className="col-12 text-danger">{weatherDescription}</h3>
              <Weatherpic temperature= {fara}/>
              <Button title= "convert" onClick={() => {
                this.setState({
                  // 1. toggles state to true/false (when setState is changed it resets the render)
                  displayingCelcius: !displayingCelcius
                })
              }} />
              </div> )
    )
    }
  }

export default App;
