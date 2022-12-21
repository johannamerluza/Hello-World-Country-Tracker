import React, { Component } from 'react';
import axios from 'axios';
import Map from './Components/Map.js';
import Input from './Components/Input.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.visitedColor = 'yellow';
    this.bucketListColor = 'blue';
    this.state = {
      countries: [
        [
          'Country',
          'Popularity',
          { role: 'tooltip', type: 'string', p: { html: true } },
        ],
      ],
      visitedCountries: [],
      bucketList: [],
      options: {
        colorAxis: { colors: [this.visitedColor, this.bucketListColor] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: 'green',
        defaultColor: '#f5f5f5',
        legend: 'none',
        tooltip: { isHtml: true },
      },
    };
    this.url = 'http://localhost:3000/api';
    this.submit = this.submit.bind(this);
    this.postCountry = this.postCountry.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.url)
      .then((res) => {
        const visitedColor = this.visitedColor;
        const bucketListColor = this.bucketListColor;
        const countriesArray = res.data;
        const bucketList = [];
        const visitedArray = [];
        countriesArray.forEach((c) => {
          if (!c.bucketList) {
            visitedArray.push([c.countryName, 0, 'Visited']);
          } else {
            bucketList.push([c.countryName, 100, 'Bucket List']);
          }
        });
        const axisColors = [visitedColor, bucketListColor];
        // console.log(axisColors);
        if (bucketList.length === 0 && visitedArray.length > 0) {
          axisColors.pop();
        } else if (bucketList.length > 0 && visitedArray.length === 0) {
          axisColors.unshift();
        }
        const firstEl = [
          'Country',
          'Popularity',
          { role: 'tooltip', type: 'string', p: { html: true } },
        ];
        this.setState({
          countries: [firstEl, ...visitedArray, ...bucketList],
          visitedCountries: visitedArray,
          bucketList: bucketList,
          options: {
            colorAxis: { colors: axisColors },
            ...this.state.options,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllCountries() {
    axios
      .get(this.url)
      .then((res) => {
        const visitedColor = 'yellow';
        const bucketListColor = 'blue';
        const countriesArray = res.data;
        const bucketList = [];
        const visitedArray = [];
        countriesArray.forEach((c) => {
          if (!c.bucketList) {
            visitedArray.push([c.countryName, 0, 'Visited']);
          } else {
            bucketList.push([c.countryName, 100, 'Bucket List']);
          }
        });
        const axisColors = [visitedColor, bucketListColor];
        // console.log(axisColors);
        if (bucketList.length === 0 && visitedArray.length > 0) {
          axisColors.pop();
        } else if (bucketList.length > 0 && visitedArray.length === 0) {
          axisColors.unshift();
        }
        const firstEl = [
          'Country',
          'Popularity',
          { role: 'tooltip', type: 'string', p: { html: true } },
        ];
        this.setState({
          countries: [firstEl, ...visitedArray, ...bucketList],
          visitedCountries: visitedArray,
          bucketList: bucketList,
          options: {
            colorAxis: { colors: axisColors },
            ...this.state.options,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postCountry(country, option) {
    const newCountry = { countryName: country, bucketList: option };
    axios
      .post(this.url, newCountry)
      .then((response) => {
        console.log(response);
        this.getAllCountries();
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  submit(e) {
    e.preventDefault();
    console.dir(e.target);
    const newCountry = e.target['0']['value'];
    let option = e.target['1'].value;
    console.log(newCountry, option);
    option === 'bucketList' ? (option = true) : (option = false);
    // console.log(option);
    e.target['0']['value'] = '';
    this.postCountry(newCountry, option);
  }

  render() {
    console.log('this.state: ', this.state);

    return (
      <div>
        <h1 id="helloWorld">Hello World</h1>
        <Map options={this.state.options} countries={this.state.countries} />
        <Input handleSubmit={this.submit} />
      </div>
    );
  }
}

export default App;
