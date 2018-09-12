import React from 'react';
import PropTypes from 'prop-types';
import { monthStringGenerator } from '../../../utility/utility';

const MonthPicker = (props) => {
  const {
    monthPicked,
    onChange,
  } = props;

  const monthArray = [];
  for (let i = 0; i < 12; i += 1) {
    const month = {
      index: i,
      string: monthStringGenerator(i),
    };
    monthArray.push(month);
  }

  const monthOptions = monthArray === null
    ? null
    : monthArray.map(month => (
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
  monthPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;
