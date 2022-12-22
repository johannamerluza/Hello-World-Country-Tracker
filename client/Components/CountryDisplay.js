import React from 'react';
import { ModalCopy } from './Modal.js';
import { ModalProvider } from 'styled-react-modal';

const CountryDisplay = (props) => {
  const xButton = (
    <button id="delete" className="listButton" onClick={props.deleteCountry}>
      X
    </button>
  );
  const visitedCountryList = [];
  const bucketListList = [];
  for (let i = 0; i < props.allCountries.length; i++) {
    if (i === 0) continue;
    // console.log(props.allCountries[i]);
    if (props.allCountries[i][2] === 'Visited') {
      visitedCountryList.push(
        <li className="mainList" key={`li${i}`}>
          {xButton}
          {props.allCountries[i][0]}
          {props.exist(props.allCountries[i][0]) ? (
            <ModalCopy text={props.text(props.allCountries[i][0])} />
          ) : (
            <></>
          )}
        </li>,
      );
    } else {
      bucketListList.push(
        <li className="mainList" key={`li${i}`}>
          <button id="upgrade" className="listButton" onClick={props.upgrade}>
            &#9650;
          </button>
          {xButton}
          {props.allCountries[i][0]}
          {props.exist(props.allCountries[i][0]) ? (
            <ModalCopy text={props.text(props.allCountries[i][0])} />
          ) : (
            <></>
          )}
        </li>,
      );
    }
  }
  console.log('country total: ', props.countryTotal);
  return (
    <div id="countryDisplay">
      <div id="continentTabs">
        <button
          className={
            props.currentContinent === 'world' ? 'currentTab' : 'cTabs'
          }
          value="world"
          onClick={props.cTab}
        >
          World
        </button>
        <button
          className={props.currentContinent === 'asia' ? 'currentTab' : 'cTabs'}
          value="asia"
          onClick={props.cTab}
        >
          Asia
        </button>
        <button
          className={
            props.currentContinent === 'africa' ? 'currentTab' : 'cTabs'
          }
          value="africa"
          onClick={props.cTab}
        >
          Africa
        </button>
        <button
          className={
            props.currentContinent === 'europe' ? 'currentTab' : 'cTabs'
          }
          value="europe"
          onClick={props.cTab}
        >
          Europe
        </button>
        <button
          className={
            props.currentContinent === 'northAmerica' ? 'currentTab' : 'cTabs'
          }
          value="northAmerica"
          onClick={props.cTab}
        >
          North America
        </button>
        <button
          className={
            props.currentContinent === 'oceania' ? 'currentTab' : 'cTabs'
          }
          value="oceania"
          onClick={props.cTab}
        >
          Oceania
        </button>
        <button
          className={
            props.currentContinent === 'southAmerica' ? 'currentTab' : 'cTabs'
          }
          value="southAmerica"
          onClick={props.cTab}
        >
          South America
        </button>
      </div>
      <div id="visitedList">
        <h2 className="listTitle">Visited Countries</h2>
        <h4 className="countryData">
          # of Countries Visited: {visitedCountryList.length}
        </h4>
        <h4 className="countryData">
          Percent Visited:{' '}
          {Math.round(
            (visitedCountryList.length / props.countryTotal) * 100,
          ).toFixed(2)}
          %
        </h4>
        <div className="listDiv">
          <ul className="inlineList">{visitedCountryList}</ul>
        </div>
      </div>
      <div id="bucketListList">
        <h2 className="listTitle">Bucket List</h2>
        <h4 className="countryData">
          # of Countries in Bucket List: {bucketListList.length}
        </h4>
        <div className="listDiv">
          <ul className="inlineList">{bucketListList}</ul>
        </div>
      </div>
    </div>
  );
};

export default CountryDisplay;
