import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CHANGE_SESSION } from '../../store/actions/index';

import HourPicker from './Pickers/HourPicker';
import MinutePicker from './Pickers/MinutePicker';

import './TimePicker.css';

export class TimePicker extends PureComponent {
  state = {
    hourPicked: '00',
    minutePicked: '00',
  }

  componentWillMount() {
    const {
      hourInit,
      minuteInit,
    } = this.props;

    if (hourInit == null) {
      return;
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

    return (
      <form className="TimePicker">
        <HourPicker
          hourPicked={hourPicked}
          onChange={event => timeChangeHandler(event, 'hour')}
        />
        <p className="TimePicker_select">:</p>
        <MinutePicker
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
