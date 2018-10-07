import React, {Component} from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = '31d84f37d0b5d667eecf08cfa83e3ddd';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }

  convertToFahrenheit = (temp) =>{
    //(temp − 273.15) × 9/5 + 32
    return (
      Number((temp - 273.15) * (9/5) + 32).toFixed(2)
    );
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();
    if(city && country){


      this.setState({
        temperature: this.convertToFahrenheit(data.main.temp),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }

  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Title />
                </div>
                <div className="col-sm-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;