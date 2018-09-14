import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';

import HourPicker from './Pickers/HourPicker';
import MinutePicker from './Pickers/MinutePicker';

import './TimePicker.css';

export const TimePicker = (props) => {
  const {
    hourPicked,
    minutePicked,
    hourArray,
    minuteArray,
    changeSessionHour,
    changeSessionMinute,
  } = props;

  const timeChangeHandler = (event, selector) => {
    const { value } = event.target;

    if (selector === 'hour') {
      changeSessionHour(value);
    }

    if (selector === 'minute') {
      changeSessionMinute(value);
    }
  };

  return (
    <form className="TimePicker">
      <HourPicker
        hourPicked={hourPicked}
        hourArray={hourArray}
        onChange={event => timeChangeHandler(event, 'hour')}
      />
      <p className="TimePicker_select">:</p>
      <MinutePicker
        minutePicked={minutePicked}
        minuteArray={minuteArray}
        onChange={event => timeChangeHandler(event, 'minute')}
      />
    </form>
  );
};

TimePicker.propTypes = {
  hourPicked: PropTypes.string.isRequired,
  minutePicked: PropTypes.string.isRequired,
  hourArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  minuteArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeSessionHour: PropTypes.func.isRequired,
  changeSessionMinute: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  hourPicked: state.sessionState.hour,
  minutePicked: state.sessionState.minute,
  hourArray: state.sessionState.hourArray,
  minuteArray: state.sessionState.minuteArray,
});

const mapActionToProps = dispatch => ({
  changeSessionHour: hour => dispatch(actions.changeSessionHour(hour)),
  changeSessionMinute: minute => dispatch(actions.changeSessionMinute(minute)),
});


export default connect(mapStateToProps, mapActionToProps)(TimePicker);
