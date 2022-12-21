import React from 'react';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

const Input = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="country">
        <input type="text" id="location" name="enterCountry"></input>
      </label>
      <select id="menu">
        <option value="bucketList">Bucket List</option>
        <option value="visited">Visited</option>
      </select>
      <button type="submit" value="submit">
        Add Country
      </button>
    </form>
  </div>
);

export default Input;
