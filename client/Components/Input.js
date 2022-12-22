import React from 'react';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

const Input = (props) => (
  <div id="inputDiv">
    <div id="hidden">
      <div id="invalid" className={props.invalid}>
        Invalid Input
      </div>
    </div>
    <form id="countryform" onSubmit={props.handleSubmit}>
      <div id="formDiv">
        <div id="firstColumn">
          <div id="firstRowForm">
            {/* <label htmlFor="country"> */}
            <input
              type="text"
              id="enterCountry"
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
          <div id="second row form">
            <input
              type="text"
              id="enterNotes"
              name="notes"
              placeholder="enter notes such as memories or to dos..."
            ></input>
          </div>
        </div>
        <div id="submitDiv">
          <button id="submitButton" type="submit" value="submit">
            Add Country
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default Input;
