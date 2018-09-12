import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

const YearPicker = (props) => {
  const {
    yearPicked,
    onChange,
  } = props;

  const currentYear = dateFns.getYear(new Date());
  const yearArray = [];
  for (let i = currentYear; i < currentYear + 31; i += 1) {
    yearArray.push(i);
  }

  const yearOptions = yearArray === null
    ? null
    : yearArray.map(year => (
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
  yearPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default YearPicker;
