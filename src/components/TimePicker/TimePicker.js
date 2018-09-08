import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

class TimePicker extends PureComponent {
  state = {
    hourArray: null,
    minuteArray: null,
    hourPicked: '00',
    minutePicked: '00',
  }

  componentDidMount() {
    const hourArray = [];
    const minuteArray = [];

    for (let i = 0; i < 24; i += 1) {
      let hourString = i.toString();
      if (i < 10) {
        hourString = `0${i}`;
      }
      hourArray.push(hourString);
    }

    for (let i = 0; i < 60; i += 1) {
      let minuteString = i.toString();
      if (i < 10) {
        minuteString = `0${i}`;
      }
      minuteArray.push(minuteString);
    }

    this.setState({
      hourArray,
      minuteArray,
    });
  }

  timeChangeHandler = (event, selector) => {
    const { value } = event.target;
    let {
      hourPicked,
      minutePicked,
    } = this.state;

    if (selector === 'hour') {
      hourPicked = value;
      this.setState({
        hourPicked,
      });
    }

    if (selector === 'minute') {
      minutePicked = value;
      this.setState({
        minutePicked,
      });
    }
  }

  render() {
    const {
      applyTime,
    } = this.props;

    const {
      hourPicked,
      minutePicked,
      hourArray,
      minuteArray,
    } = this.state;

    const {
      timeChangeHandler,
    } = this;

    const hourOptions = hourArray === null
      ? null
      : hourArray.map(hour => (
        <option
          key={hour}
          value={hour}
        >
          {hour}
        </option>
      ));

    const minuteOptions = minuteArray === null
      ? null
      : minuteArray.map(minute => (
        <option
          key={minute}
          value={minute}
        >
          {minute}
        </option>
      ));

    const timeIDString = `${hourPicked}${minutePicked}`;
    const timeID = parseInt(timeIDString, 10);

    return (
      <div>
        <form>
          <select
            value={hourPicked}
            onChange={event => timeChangeHandler(event, 'hour')}
          >
            {hourOptions}
          </select>
          <select
            value={minutePicked}
            onChange={event => timeChangeHandler(event, 'minute')}
          >
            {minuteOptions}
          </select>
        </form>
        <Button
          onClick={applyTime}
          id={timeID}
        >
          Apply
        </Button>
      </div>
    );
  }
}

TimePicker.propTypes = {
  applyTime: PropTypes.func.isRequired,
};

export default TimePicker;
