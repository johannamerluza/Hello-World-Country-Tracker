import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      options: {
        colorAxis: { colors: ['pink', 'blue'] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: 'green',
        defaultColor: '#f5f5f5',
        legend: 'none',
        tooltip: { isHtml: true },
      },
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:3000/api')
      .then((res) => {
        // console.log(res.data);
        const countries = res.data;
        countries.forEach((c) => {
          if (c[1] === 0) c.push('Bucket List');
          else c.push('Visited');
        });
        countries.unshift([
          'Country',
          'Popularity',
          { role: 'tooltip', type: 'string', p: { html: true } },
        ]);
        console.log(countries);
        this.setState({ countries: countries });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('this.state: ', this.state);

    return (
      <div>
        <h1>Hello World</h1>
        <Chart
          className="worldMap"
          chartType="GeoChart"
          width="100%"
          //   height="400px"
          data={this.state.countries}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default App;
