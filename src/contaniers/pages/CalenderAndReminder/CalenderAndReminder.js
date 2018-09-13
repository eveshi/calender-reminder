import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Calender from '../../../components/Calender/Calender';
import Reminder from '../../../components/Reminder/Reminder';
import ConnectedDatePicker from '../../../components/DatePicker/DatePicker';

import AddReminder from '../../../assets/icon/AddReminder';

import { CHANGE_DAY, CHANGE_SESSION } from '../../../store/actions/index';
import { dateStringGenerator } from '../../../utility/utility';

import './CalenderAndReminder.css';

export const CalenderAndReminder = (props) => {
  const {
    year,
    month,
    day,
    changeDay,
    reminders,
    changeSession,
  } = props;

  const dayChangeHandler = (event) => {
    const { id } = event.target;
    changeDay(parseInt(id, 10));
    const date = dateStringGenerator(year, month, id);
    changeSession(date);
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
  changeDay: PropTypes.func.isRequired,
  reminders: PropTypes.arrayOf(PropTypes.object),
  changeSession: PropTypes.func.isRequired,
};

CalenderAndReminder.defaultProps = {
  reminders: null,
};

const mapStateToProps = state => ({
  year: state.date.year,
  month: state.date.month,
  day: state.date.day,
  reminders: state.remindersDisplay,
});

const mapActionToProps = dispatch => ({
  changeDay: day => dispatch(CHANGE_DAY(day)),
  changeSession: date => dispatch(CHANGE_SESSION(date, null, null)),
});

export default connect(mapStateToProps, mapActionToProps)(CalenderAndReminder);
