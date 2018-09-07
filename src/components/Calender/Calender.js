import React, { PureComponent } from 'react';
import dateFns from 'date-fns';
import CalenderCell from '../CalenderCell/CalenderCell';
import './Calender.css';

class Calender extends PureComponent {
  state = {
    fillArray: null,
    daysArray: null,
  }

  componentDidMount() {
    const daysOfMonth = dateFns.getDaysInMonth(new Date());
    const firstDayOfMonth = dateFns.startOfMonth(new Date());
    const weekdayOfStartDayOfMonth = dateFns.getDay(new Date(firstDayOfMonth));

    let fillArray = [];
    for (let i = 1; i < weekdayOfStartDayOfMonth + 1; i += 1) {
      fillArray.push(i);
    }
    if (weekdayOfStartDayOfMonth === 7) {
      fillArray = null;
    }

    const daysArray = [];
    for (let i = 1; i < daysOfMonth + 1; i += 1) {
      daysArray.push(i);
    }

    this.setState({
      fillArray,
      daysArray,
    });
  }

  render() {
    const {
      fillArray,
      daysArray,
    } = this.state;

    const fills = fillArray === null
      ? null
      : fillArray.map(fill => (
        <div key={fill} />
      ));

    const cells = daysArray === null
      ? null
      : daysArray.map(day => (
        <CalenderCell
          key={day}
          day={day}
        />
      ));

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
  }
}

export default Calender;
