import React from 'react';
import { Chart } from 'react-google-charts';
// import axios from 'axios';

const Map = (props) => (
  <div id="mapDiv">
    <Chart
      id="worldMap"
      chartType="GeoChart"
      width="90%"
      data={props.countries}
      options={props.options}
    />
  </div>
);

export default Map;