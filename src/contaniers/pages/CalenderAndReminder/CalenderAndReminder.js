import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Calender from '../../../components/Calender/Calender';
import Reminder from '../../../components/Reminder/Reminder';
import ConnectedDatePicker from '../../../components/DatePicker/DatePicker';

import AddReminder from '../../../assets/icon/AddReminder';

import { changeDay, changeSessionDate } from '../../../store/actions/index';
import { dateStringGenerator } from '../../../utility/utility';

import './CalenderAndReminder.css';

export const CalenderAndReminder = (props) => {
  const {
    year,
    month,
    day,
    changeDayHandler,
    reminders,
    changeSessionDateHandler,
  } = props;

  const dayChangeHandler = (event) => {
    const { id } = event.target;
    changeDayHandler(parseInt(id, 10));
    const date = dateStringGenerator(year, month, id);
    changeSessionDateHandler(date);
  };

  return (
    <div className="CalenderAndReminder">
      <div className="CalenderAndReminder_header">
        <ConnectedDatePicker applyButtonDisabled={false} />
        <Link to="/edit_reminder">
          <AddReminder />
        </Link>
      </div>
      <Calender
        year={year}
        month={month}
        day={day}
        onClick={event => dayChangeHandler(event)}
      />
      <Reminder
        reminders={reminders}
      />
    </div>
  );
};

CalenderAndReminder.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  changeDayHandler: PropTypes.func.isRequired,
  reminders: PropTypes.arrayOf(PropTypes.object),
  changeSessionDateHandler: PropTypes.func.isRequired,
};

CalenderAndReminder.defaultProps = {
  reminders: null,
};

const mapStateToProps = state => ({
  year: state.reminderState.date.year,
  month: state.reminderState.date.month,
  day: state.reminderState.date.day,
  reminders: state.reminderState.remindersDisplay,
});

const mapActionToProps = dispatch => ({
  changeDayHandler: day => dispatch(changeDay(day)),
  changeSessionDateHandler: date => dispatch(changeSessionDate(date)),
});

export default connect(mapStateToProps, mapActionToProps)(CalenderAndReminder);
