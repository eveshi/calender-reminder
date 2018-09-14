import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { timeStringGenerator } from '../../utility/utility';
import Button from '../Button/Button';

import { changeSessionReminder } from '../../store/actions/index';

const ReminderCell = (props) => {
  const {
    time,
    id,
    reminder,
    changeSessionReminderHandler,
  } = props;

  const timeString = timeStringGenerator(time);
  const reminderSession = {
    id,
    time,
    reminder,
  };

  return (
    <Button onClick={() => changeSessionReminderHandler(reminderSession)}>
      <Link to="/reminder_details">
        <p className="Reminder_ReminderCell_timeString">{timeString}</p>
        <p className="Reminder_ReminderCell_reminder">{reminder}</p>
      </Link>
    </Button>
  );
};

ReminderCell.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  reminder: PropTypes.string.isRequired,
  changeSessionReminderHandler: PropTypes.func.isRequired,
};

const mapActionToProps = dispatch => ({
  changeSessionReminderHandler: reminder => dispatch(changeSessionReminder(reminder)),
});

export default connect(null, mapActionToProps)(ReminderCell);
