import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { monthStringGenerator } from '../../../utility/utility';

const MonthPicker = (props) => {
  const {
    yearPicked,
    monthPicked,
    onChange,
  } = props;

  const monthArray = [];

  const currentYear = dateFns.getYear(new Date());
  const currentMonth = dateFns.getMonth(new Date());

  const monthInit = parseInt(yearPicked, 10) === currentYear
    ? currentMonth
    : 0;

  for (let i = monthInit; i < 12; i += 1) {
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
  yearPicked: PropTypes.string.isRequired,
  monthPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;
