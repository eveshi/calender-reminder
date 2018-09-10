import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import CalenderCell from '../CalenderCell/CalenderCell';
import './Calender.css';

const Calender = (props) => {
  const {
    year,
    month,
    day,
    onClick,
  } = props;

  const date = new Date(year, month, day);
  const daysOfMonth = dateFns.getDaysInMonth(date);
  const firstDayOfMonth = dateFns.startOfMonth(date);
  const weekdayOfStartDayOfMonth = dateFns.getDay(new Date(firstDayOfMonth));

  let fillArray = [];
  for (let i = 1; i < weekdayOfStartDayOfMonth + 1; i += 1) {
    fillArray.push(i);
  }
  if (weekdayOfStartDayOfMonth === 7) {
    fillArray = [];
  }

  const daysArray = [];
  for (let i = 1; i < daysOfMonth + 1; i += 1) {
    daysArray.push(i);
  }

  const fills = fillArray === null
    ? null
    : fillArray.map(fill => (
      <div key={fill} />
    ));

  const cells = daysArray === null
    ? null
    : daysArray.map((dayItem) => {
      const picked = (dayItem === day);
      return (
        <CalenderCell
          key={dayItem}
          day={dayItem}
          picked={picked}
          onClick={onClick}
        />
      );
    });

  return (
    <div className="calender">
      <p className="calender__weekday">Sun</p>
      <p className="calender__weekday">Mon</p>
      <p className="calender__weekday">Tue</p>
      <p className="calender__weekday">Wed</p>
      <p className="calender__weekday">Thu</p>
      <p className="calender__weekday">Fri</p>
      <p className="calender__weekday">Sat</p>
      {fills}
      {cells}
    </div>
  );
};

Calender.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Calender;
