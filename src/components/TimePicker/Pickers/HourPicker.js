import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { hourStringGenerator, formatCurrentDate } from '../../../utility/utility';

const HourPicker = (props) => {
  const {
    datePicked,
    hourPicked,
    onChange,
  } = props;

  const currentMinute = dateFns.getMinutes(new Date());
  const currentHour = dateFns.getHours(new Date());

  const hourInit = (formatCurrentDate === datePicked
                    && currentMinute < 55)
    ? currentHour
    : 0;

  const hourArray = [];
  for (let i = hourInit; i < 24; i += 1) {
    const hourString = hourStringGenerator(i);
    hourArray.push(hourString);
  }

  const hourOptions = hourArray == null
    ? null
    : hourArray.map(hour => (
      <option
        key={hour}
        value={hour}
      >
        {hour}
      </option>
    ));

  return (
    <select
      className="TimePicker_select"
      value={hourPicked}
      onChange={onChange}
      name="hour"
    >
      {hourOptions}
    </select>
  );
};

HourPicker.propTypes = {
  datePicked: PropTypes.string.isRequired,
  hourPicked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HourPicker;
