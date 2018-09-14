import React from 'react';
import PropTypes from 'prop-types';

const MonthPicker = (props) => {
  const {
    monthArray,
    monthPicked,
    onChange,
  } = props;

  const monthOptions = monthArray.map(month => (
    <option
      key={month.index}
      value={month.index}
    >
      {month.string}
    </option>
  ));

  return (
    <select
      className="DatePicker_picker_select"
      value={monthPicked}
      onChange={onChange}
    >
      {monthOptions}
    </select>
  );
};

MonthPicker.propTypes = {
  monthArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  monthPicked: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;
