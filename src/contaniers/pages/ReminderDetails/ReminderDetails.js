import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { timeStringGenerator, monthStringGenerator } from '../../../utility/utility';
import Button from '../../../components/Button/Button';
import * as actions from '../../../store/actions/index';

import Close from '../../../assets/icon/Close';
import Edit from '../../../assets/icon/Edit';
import Delete from '../../../assets/icon/Delete';

import './ReminderDetail.css';

export const ReminderDetails = (props) => {
  const {
    year,
    month,
    day,
    id,
    cleanSession,
    time,
    reminder,
    deleteReminder,
    date,
  } = props;

  const deleteReminderHandler = () => {
    deleteReminder(date, id);
    cleanSession();
  };

  const timeString = timeStringGenerator(time);

  return (
    <div className="ReminderDetails">
      <div className="ReminderDetails_header">
        <Link to="/">
          <Button onClick={() => cleanSession()}>
            <Close />
          </Button>
        </Link>
        <Link to="/edit_reminder">
          <Edit />
        </Link>
      </div>
      <div className="ReminderDetails_content">
        <p className="ReminderDetails_content_time">
          {year}
          &nbsp;-&nbsp;
          {monthStringGenerator(month)}
          &nbsp;-&nbsp;
          {day}
        </p>
        <p className="ReminderDetails_content_time">
          {timeString}
        </p>
        <p className="ReminderDetails_content_reminder">
          {reminder}
        </p>
        <Link to="/">
          <Button onClick={() => deleteReminderHandler()}>
            <Delete />
          </Button>
        </Link>
      </div>
    </div>
  );
};

ReminderDetails.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  reminder: PropTypes.string.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  cleanSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  year: state.reminderState.date.year,
  month: state.reminderState.date.month,
  day: state.reminderState.date.day,
  date: state.reminderState.date.date,
  reminder: state.sessionState.reminder.reminder,
  id: state.sessionState.reminder.id,
  time: state.sessionState.reminder.time,
});

const mapActionToProps = dispatch => ({
  deleteReminder: (date, id) => dispatch(actions.deleteReminder(date, id)),
  cleanSession: () => dispatch(actions.cleanSession()),
});

export default connect(mapStateToProps, mapActionToProps)(ReminderDetails);
