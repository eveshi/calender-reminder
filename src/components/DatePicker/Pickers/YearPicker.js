import React from 'react';
import PropTypes from 'prop-types';

const YearPicker = (props) => {
  const {
    yearPicked,
    yearArray,
    onChange,
  } = props;

  const yearOptions = yearArray.map(year => (
    <option
      key={year}
      value={year}
    >
      {year}
    </option>
  ));

  return (
    <select
      className="DatePicker_picker_select"
      value={yearPicked}
      onChange={onChange}
    >
      {yearOptions}
    </select>
  );
};

YearPicker.propTypes = {
  yearPicked: PropTypes.number.isRequired,
  yearArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default YearPicker;
