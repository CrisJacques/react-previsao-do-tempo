import React from 'react';
import axios from 'axios';

const API = 'https://api.hgbrasil.com/weather?woeid=455823&format=json-cors&locale=pt';// woeid é de Porto Alegre

export default class App extends React.Component {
  state = {
    city: "Carregando...",
    forecast: []
  }

  componentDidMount(){
    axios.get(API)
      .then(({data}) => {
        this.setState({
          city: data.results.city_name,
          forecast: data.results.forecast
        });
      });
  }
  
  render(){
    return (
      <div className="container centered">
        <h1>{this.state.city}</h1>
        <table>
          <thead>
            <tr>
            <th>Data</th>
            <th>Min.</th>
            <th>Max.</th>
            <th>Previsão</th>
            <th>Ícone</th>
            </tr>
          </thead>
          <tbody>
           {
             this.state.forecast.map((day, index)=> {
               return (
                <tr key={day.date}>
                  <td>{day.date}</td>
                  <td>{day.min}</td>
                  <td>{day.max}</td>
                  <td>{day.description}</td>
                  <td><img src={`/weather-icons/${day.condition}.svg`} alt={day.description}/></td>
                </tr>
               );
             })
           }
          </tbody>
        </table>
      </div>
    );
  }
}

