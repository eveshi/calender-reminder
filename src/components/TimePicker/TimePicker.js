import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as utility from '../../utility/utility';
import { CHANGE_SESSION } from '../../store/actions/index';

import './TimePicker.css';

export class TimePicker extends PureComponent {
  state = {
    hourArray: null,
    minuteArray: null,
    hourPicked: '00',
    minutePicked: '00',
  }

  componentWillMount() {
    const {
      hourInit,
      minuteInit,
    } = this.props;

    this.setState({
      hourPicked: hourInit,
      minutePicked: minuteInit,
    });
  }

  componentDidMount() {
    const hourArray = [];
    const minuteArray = [];

    for (let i = 0; i < 24; i += 1) {
      const hourString = utility.hourStringGenerator(i);
      hourArray.push(hourString);
    }

    for (let i = 0; i < 60; i += 1) {
      const minuteString = utility.minuteStringGenerator(i);
      minuteArray.push(minuteString);
    }

    this.setState({
      hourArray,
      minuteArray,
    });
  }

  timeChangeHandler = (event, selector) => {
    const {
      changeSession,
    } = this.props;

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

    const timeIDString = `${hourPicked}${minutePicked}`;
    const timeID = parseInt(timeIDString, 10);

    changeSession(timeID);
  }

  render() {
    const {
      hourPicked,
      minutePicked,
      hourArray,
      minuteArray,
    } = this.state;

    const {
      timeChangeHandler,
    } = this;

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

    const minuteOptions = minuteArray == null
      ? null
      : minuteArray.map(minute => (
        <option
          key={minute}
          value={minute}
        >
          {minute}
        </option>
      ));

    return (
      <form className="TimePicker">
        <select
          className="TimePicker_select"
          value={hourPicked}
          onChange={event => timeChangeHandler(event, 'hour')}
          name="hour"
        >
          {hourOptions}
        </select>
        <p className="TimePicker_select">:</p>
        <select
          className="TimePicker_select"
          value={minutePicked}
          onChange={event => timeChangeHandler(event, 'minute')}
          name="minute"
        >
          {minuteOptions}
        </select>
      </form>
    );
  }
}

TimePicker.propTypes = {
  hourInit: PropTypes.string,
  minuteInit: PropTypes.string,
  changeSession: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  hourInit: '00',
  minuteInit: '00',
};

const mapActionToProps = dispatch => ({
  changeSession: time => dispatch(CHANGE_SESSION(null, time, null)),
});


export default connect(null, mapActionToProps)(TimePicker);
