import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ConnectedDatePicker from '../../../components/DatePicker/DatePicker';
import ConnectedTimePicker from '../../../components/TimePicker/TimePicker';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import * as actions from '../../../store/actions';

import Close from '../../../assets/icon/Close';
import Complete from '../../../assets/icon/Complete';

import './EditReminder.css';

export const EditReminder = (props) => {
  const {
    yearPicked,
    monthPicked,
    dayPicked,
    preDate,
    preID,
    preTime,
    hourPicked,
    minutePicked,
    datePicked,
    timePicked,
    cleanSession,
    reminder,
    postReminder,
    putReminder,
    changeSessionReminder,
    changeDay,
    changeYearAndMonth,
  } = props;

  const reminderChangeHandler = (event) => {
    const { value } = event.target;
    const newReminder = {
      id: preID,
      time: preTime,
      reminder: value,
    };
    changeSessionReminder(newReminder);
  };

  const submitReminder = () => {
    // const date = (sessionDate === null || dateFns.isPast(sessionDate))
    //   ? utility.formatCurrentDate
    //   : sessionDate;

    // const defaultTime = dateFns.isPast(sessionDate)
    //   ? utility.timeIDGenerator(dateFns.getHours(new Date()), utility.minuteFiveGenerator())
    //   : 0;

    // const time = sessionTime === null
    //   ? defaultTime
    //   : sessionTime;

    if (preID === 0) {
      postReminder(datePicked, timePicked, reminder);
    } else {
      putReminder(preDate, datePicked, preID, timePicked, reminder);
    }
    changeDay(dayPicked);
    changeYearAndMonth(yearPicked, monthPicked);
    cleanSession();
  };

  return (
    <div className="EditReminder">
      <div className="EditReminder_header">
        <Link to="/">
          <Button onClick={() => cleanSession()}>
            <Close />
          </Button>
        </Link>
        <Link to="/">
          <Button onClick={() => submitReminder()}>
            <Complete />
          </Button>
        </Link>
      </div>
      <div className="EditReminder_form">
        <ConnectedDatePicker
          dayPickerDisabled={false}
          datePickerDisabled={false}
        />
        <ConnectedTimePicker
          hourInit={hourPicked}
          minuteInit={minutePicked}
          datePicked={datePicked}
        />
        <div className="EditReminder_form_input">
          <Input
            maxLength="50"
            placeholder="Dinner with Danny..."
            value={reminder}
            onChange={event => reminderChangeHandler(event)}
          />
          <p>
            {reminder.length}
            /50
          </p>
        </div>
      </div>
    </div>
  );
};

EditReminder.propTypes = {
  yearPicked: PropTypes.number.isRequired,
  monthPicked: PropTypes.number.isRequired,
  dayPicked: PropTypes.number.isRequired,
  preDate: PropTypes.string.isRequired,
  preID: PropTypes.number.isRequired,
  preTime: PropTypes.number.isRequired,
  hourPicked: PropTypes.string.isRequired,
  minutePicked: PropTypes.string.isRequired,
  datePicked: PropTypes.string.isRequired,
  timePicked: PropTypes.number.isRequired,
  reminder: PropTypes.string.isRequired,
  cleanSession: PropTypes.func.isRequired,
  postReminder: PropTypes.func.isRequired,
  putReminder: PropTypes.func.isRequired,
  changeSessionReminder: PropTypes.func.isRequired,
  changeDay: PropTypes.func.isRequired,
  changeYearAndMonth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  yearPicked: state.sessionState.year,
  monthPicked: state.sessionState.month.index,
  dayPicked: state.sessionState.day,
  preTime: state.sessionState.reminder.time,
  preID: state.sessionState.reminder.id,
  reminder: state.sessionState.reminder.reminder,
  preDate: state.reminderState.date.date,
  hourPicked: state.sessionState.hour,
  minutePicked: state.sessionState.minute,
  datePicked: state.sessionState.date,
  timePicked: state.sessionState.time,
});

const mapActionToProps = dispatch => ({
  postReminder: (date, time, reminder) => dispatch(actions.postReminder(date, time, reminder)),
  putReminder: (preDate, nextDate, id, time, reminder) => dispatch(
    actions.putReminder(preDate, nextDate, id, time, reminder),
  ),
  cleanSession: () => dispatch(actions.cleanSession()),
  changeSessionReminder: reminder => dispatch(actions.changeSessionReminder(reminder)),
  changeDay: day => dispatch(actions.changeDay(day)),
  changeYearAndMonth: (year, month) => dispatch(actions.changeYearAndMonth(year, month)),
});

export default connect(mapStateToProps, mapActionToProps)(EditReminder);
