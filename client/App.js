import React, { Component } from 'react';
import axios from 'axios';
import Map from './Components/Map.js';
import Input from './Components/Input.js';
import CountryDisplay from './Components/CountryDisplay.js';

const africa = new Set([
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Comoros',
  'Democratic Republic of the Congo',
  'Republic of the Congo',
  "Cote d'Ivoire",
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea Bissau',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Sao Tome and Principe',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Swaziland',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe',
]);
const northAmerica = new Set([
  'Antigua and Barbuda',
  'Bahamas',
  'Bermuda',
  'Barbados',
  'Belize',
  'Canada',
  'Costa Rica',
  'Cuba',
  'Dominica',
  'Dominican Republic',
  'El Salvador',
  'Grenada',
  'Guatemala',
  'Haiti',
  'Honduras',
  'Jamaica',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Trinidad and Tobago',
  'United States',
  'United States of America',
]);
const southAmerica = new Set([
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Ecuador',
  'Guyana',
  'Paraguay',
  'Peru',
  'Suriname',
  'Uruguay',
  'Venezuela',
]);
const europe = new Set([
  'Albania',
  'Andorra',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Belarus',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Greenland',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Kazakhstan',
  'Kosovo',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Malta',
  'Moldova',
  'Monaco',
  'Montenegro',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'San Marino',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'Vatican City',
]);
const asia = new Set([
  'Armenia',
  'Azerbaijan',
  'Bangladesh',
  'Bhutan',
  'Brunei',
  'Cambodia',
  'China',
  'Georgia',
  'India',
  'Indonesia',
  'Japan',
  'Kazakhstan',
  'Kyrgyzstan',
  'Laos',
  'Malaysia',
  'Maldives',
  'Mongolia',
  'Myanmar',
  'Nepal',
  'North Korea',
  'Pakistan',
  'Philippines',
  'Russia',
  'Singapore',
  'South Korea',
  'Sri Lanka',
  'Taiwan',
  'Tajikistan',
  'Thailand',
  'Timor Leste',
  'Turkmenistan',
  'Uzbekistan',
  'Vietnam',
  'Bahrain',
  'Iran',
  'Iraq',
  'Israel',
  'Jordan',
  'Kuwait',
  'Lebanon',
  'Oman',
  'Palestine',
  'Qatar',
  'Saudi Arabia',
  'Syria',
  'United Arab Emirates',
  'Yemen',
]);
// const middleEast = new Set([
//   'Bahrain',
//   'Iran',
//   'Iraq',
//   'Israel',
//   'Jordan',
//   'Kuwait',
//   'Lebanon',
//   'Oman',
//   'Palestine',
//   'Qatar',
//   'Saudi Arabia',
//   'Syria',
//   'United Arab Emirates',
//   'Yemen',
// ]);
const oceania = new Set([
  'Australia',
  'Federated Islands of Micronesia',
  'Fiji',
  'French Polynesia',
  'Guam',
  'Kiribati',
  'Marshall Islands',
  'Nauru',
  'New Zealand',
  'Paulau',
  'Papua New Guinea',
  'Samoa',
  'Solomon Islands',
  'Tonga',
  'Tuvala',
  'Vanuata',
]);

const worldCountries = new Set([
  ...oceania,
  ...europe,
  ...asia,
  ...northAmerica,
  ...southAmerica,
  ...africa,
]);

const worldCountriesObj = {
  oceania: oceania,
  europe: europe,
  asia: asia,
  northAmerica: northAmerica,
  southAmerica: southAmerica,
  africa: africa,
};

const countryCount = {
  oceania: 14,
  asia: 48,
  africa: 54,
  northAmerica: 23,
  southAmerica: 17,
  europe: 44,
  world: 195,
};

const regions = {
  oceania: '009',
  asia: '142',
  africa: '002',
  northAmerica: '021',
  southAmerica: '005',
  europe: '150',
  world: 'world',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.visitedColor = '#007f5f';
    this.bucketListColor = '#ffbf69';
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
        backgroundColor: '#013a63',
        datalessRegionColor: '#adb5bd',
        defaultColor: '#f1f1f1',
        legend: 'none',
        region: 'world',
        tooltip: { isHtml: true },
      },
      invalid: 'none',
      countryTotal: 195,
      filtered: false,
      filterArray: [],
      currentContinent: 'world',
    };
    this.url = 'http://localhost:3000/api';
    this.submit = this.submit.bind(this);
    this.postCountry = this.postCountry.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.delete = this.delete.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.countryFilter = this.countryFilter.bind(this);
  }

  componentDidMount() {
    this.getAllCountries();
  }

  countryFilter(e) {
    // console.log(e.target.value);
    if (e.target.value === 'world') {
      this.setState({ ...this.state, filtered: false });
      return this.getAllCountries();
    }
    // this.getAllCountries();
    const newRegion = regions[e.target.value];
    const newCount = countryCount[e.target.value];
    const continent = worldCountriesObj[e.target.value];
    console.log(continent);
    const visitedColor = this.visitedColor;
    const bucketListColor = this.bucketListColor;
    const countriesArray = [...this.state.countries];
    countriesArray.unshift();
    const bucketList = [];
    const visitedArray = [];
    countriesArray.forEach((c) => {
      if (continent.has(c[0])) {
        if (c[2] === 'Visited') {
          visitedArray.push(c);
        } else {
          bucketList.push(c);
        }
      }
    });
    console.log('visitedArray: ', visitedArray);
    const axisColors = [visitedColor, bucketListColor];
    if (bucketList.length === 0 && visitedArray.length > 0) {
      axisColors.pop();
    } else if (bucketList.length > 0 && visitedArray.length === 0) {
      axisColors.unshift();
    }
    const sortedVisitedArray = visitedArray.sort();
    const sortedBucketList = bucketList.sort();
    const firstEl = [
      'Country',
      'Popularity',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ];
    console.log([firstEl, ...sortedVisitedArray, ...sortedBucketList]);
    return this.setState({
      ...this.state,
      filtered: true,
      filteredArray: [firstEl, ...sortedVisitedArray, ...sortedBucketList],
      options: {
        ...this.state.options,
        colorAxis: { colors: axisColors },
        region: newRegion,
      },
      countryTotal: newCount,
      currentContinent: e.target.value,
    });
  }

  getAllCountries() {
    // console.log('GETTIN THEM COUNTRIES');
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
        const sortedVisitedArray = visitedArray.sort();
        const sortedBucketList = bucketList.sort();
        const firstEl = [
          'Country',
          'Popularity',
          { role: 'tooltip', type: 'string', p: { html: true } },
        ];
        console.log('AXIS COLORS: ', axisColors);
        return this.setState({
          ...this.state,
          countries: [firstEl, ...sortedVisitedArray, ...sortedBucketList],
          visitedCountries: sortedVisitedArray,
          bucketList: sortedBucketList,
          options: {
            ...this.state.options,
            colorAxis: { colors: axisColors },
            region: 'world',
          },
          countryTotal: countryCount.world,
          currentContinent: 'world',
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

  delete(e) {
    // console.dir(e);
    // console.log('line 332', e.target.nextSibling);
    const countryName = e.target.nextSibling.textContent;

    console.log({ countryName: countryName });
    axios
      .delete(this.url, { data: { countryName: countryName } })
      .then(() => this.getAllCountries())
      .catch((err) => {
        console.log('error in delete: ', err);
      });
  }

  upgrade(e) {
    // console.dir(e);
    // console.log('line 349', e.target.nextSibling.nextSibling.textContent);
    const countryName = e.target.nextSibling.nextSibling.textContent;

    console.log({ countryName: countryName });
    axios
      .put(this.url, { countryName: countryName })
      .then(() => this.getAllCountries())
      .catch((err) => {
        console.log('error in upgrade: ', err);
      });
  }

  submit(e) {
    e.preventDefault();
    this.setState({ ...this.state, invalid: 'none' });
    let input = e.target['0']['value'];
    let option = e.target['1'].value;
    console.log('option', option === '');
    if (input === '' || option === '') {
      console.log('invalid');
      return this.setState({ ...this.state, invalid: '' });
      // return this.render;
    }
    let newCountry = '';
    if (input.includes(' ')) {
      const splitCountry = e.target['0']['value'].toLowerCase().split(' ');
      console.log('split', splitCountry);
      splitCountry.forEach((word, i) => {
        if (word === 'of' || word === 'and') {
          splitCountry[i] = word;
        } else {
          console.log(word);
          let newWord = word[0].toUpperCase() + word.substring(1);
          splitCountry[i] = newWord;
        }
      });
      newCountry = splitCountry.join(' ');
      console.log('newCountry line 366', newCountry);
    } else {
      input = input.toLowerCase();
      newCountry = input[0].toUpperCase() + input.substring(1);
    }
    // console.log('newCountry line 341: ', newCountry);
    if (!worldCountries.has(newCountry)) {
      console.log(newCountry, ' is invalid');
      this.setState({ ...this.state, invalid: '' });
      return this.render;
    }
    // console.log(newCountry, option);
    option === 'bucketList' ? (option = true) : (option = false);
    // console.log(option);
    e.target['0']['value'] = '';
    this.postCountry(newCountry, option);
  }

  render() {
    console.log('current continent: ', this.state.currentContinent);
    return (
      <div id="topCenter">
        <h1 id="helloWorld">Hello World.</h1>
        <Input handleSubmit={this.submit} invalid={this.state.invalid} />
        <Map
          options={this.state.options}
          countries={
            !this.state.filtered
              ? this.state.countries
              : this.state.filteredArray
          }
        />
        {/* <Input handleSubmit={this.submit} invalid={this.state.invalid} /> */}
        <CountryDisplay
          allCountries={
            !this.state.filtered
              ? this.state.countries
              : this.state.filteredArray
          }
          deleteCountry={this.delete}
          upgrade={this.upgrade}
          countryTotal={this.state.countryTotal}
          cTab={this.countryFilter}
          currentContinent={this.state.currentContinent}
        />
      </div>
    );
  }
}

export default App;
