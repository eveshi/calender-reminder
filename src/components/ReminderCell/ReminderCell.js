import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { timeStringGenerator } from '../../utility/utility';
import Button from '../Button/Button';

import { CHANGE_SESSION } from '../../store/actions/index';

const ReminderCell = (props) => {
  const {
    time,
    id,
    reminder,
    changeSession,
  } = props;

  const timeString = timeStringGenerator(time);
  const reminderSession = {
    id,
    time,
    reminder,
  };

  const changeReminderSession = () => {
    changeSession(reminderSession);
  };

  return (
    <Button onClick={() => changeReminderSession()}>
      <Link to="/reminder_details">
        <p className="Reminder_ReminderCell_timeString">{timeString}</p>
        <p className="Reminder_ReminderCell_reminder">{reminder}</p>
      </Link>
    </Button>
  );
};

ReminderCell.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  reminder: PropTypes.string.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapActionToProps = dispatch => ({
  changeSession: reminder => dispatch(CHANGE_SESSION(null, null, reminder)),
});

export default connect(null, mapActionToProps)(ReminderCell);
