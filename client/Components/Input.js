import React from 'react';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

const Input = (props) => (
  <div>
    <div id="hidden">
      <div id="invalid" className={props.invalid}>
        Invalid Input
      </div>
    </div>
    <form id="countryform" onSubmit={props.handleSubmit}>
      <div id="firstRowForm">
        {/* <label htmlFor="country"> */}
        <input
          type="text"
          id="location"
          name="enterCountry"
          placeholder="enter a country"
        ></input>
        {/* </label> */}
        <select id="menu">
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="bucketList">Bucket List</option>
          <option value="visited">Visited</option>
        </select>
      </div>
      <button id="submitButton" type="submit" value="submit">
        Add Country
      </button>
    </form>
  </div>
);

export default Input;
