import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { CHANGE_SESSION } from '../../store/actions/index';
import { hourStringGenerator } from '../../utility/utility';

import HourPicker from './Pickers/HourPicker';
import MinutePicker from './Pickers/MinutePicker';

import './TimePicker.css';

export class TimePicker extends PureComponent {
  state = {
    hourPicked: '00',
    minutePicked: '00',
  }

  componentDidMount() {
    let {
      hourInit,
      minuteInit,
    } = this.props;

    if (hourInit == null) {
      hourInit = hourStringGenerator(dateFns.getHours(new Date()));
      minuteInit = '00';
    }

    this.setState({
      hourPicked: hourInit,
      minutePicked: minuteInit,
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
    } = this.state;

    const {
      timeChangeHandler,
    } = this;

    const {
      datePicked,
    } = this.props;

    return (
      <form className="TimePicker">
        <HourPicker
          datePicked={datePicked}
          hourPicked={hourPicked}
          onChange={event => timeChangeHandler(event, 'hour')}
        />
        <p className="TimePicker_select">:</p>
        <MinutePicker
          datePicked={datePicked}
          hourPicked={hourPicked}
          minutePicked={minutePicked}
          onChange={event => timeChangeHandler(event, 'minute')}
        />
      </form>
    );
  }
}

TimePicker.propTypes = {
  hourInit: PropTypes.string,
  minuteInit: PropTypes.string,
  datePicked: PropTypes.string.isRequired,
  changeSession: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  hourInit: dateFns.getHours(new Date()),
  minuteInit: '00',
};

const mapActionToProps = dispatch => ({
  changeSession: time => dispatch(CHANGE_SESSION(null, time, null)),
});


export default connect(null, mapActionToProps)(TimePicker);
