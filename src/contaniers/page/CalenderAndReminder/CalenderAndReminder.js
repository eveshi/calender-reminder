import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Calender from '../../../components/Calender/Calender';
import Reminder from '../../../components/Reminder/Reminder';
import DatePicker from '../../../components/DatePicker/DatePicker';

import AddReminder from '../../../assets/icon/AddReminder';

import { CHANGE_DAY } from '../../../store/actions/index';

import './CalenderAndReminder.css';

const CalenderAndReminder = (props) => {
  const {
    year,
    month,
    day,
    changeDay,
    reminders,
  } = props;

  const dayChangeHandler = (event) => {
    const { id } = event.target;
    changeDay(parseInt(id, 10));
  };

  return (
    <div className="CalenderAndReminder">
      <div className="CalenderAndReminder_header">
        <DatePicker applyButtonDisabled={false} />
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
});

export default connect(mapStateToProps, mapActionToProps)(CalenderAndReminder);
