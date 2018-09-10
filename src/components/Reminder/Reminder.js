import React from 'react';
import PropTypes from 'prop-types';
import ReminderCell from '../ReminderCell/ReminderCell';
import './Reminder.css';

const Reminder = (props) => {
  const {
    reminders,
  } = props;

  const remindersDisplay = reminders.length === 0
    ? (
      <p className="Reminder_freeDay">
        - FREE DAY -
      </p>
    )
    : reminders.sort((a, b) => (
      a.id - b.id
    )).map(reminder => (
      <ReminderCell
        key={reminders.indexOf(reminder)}
        id={reminder.id}
        time={reminder.time}
        reminder={reminder.reminder}
      />
    ));

  return (
    <div className="Reminder">
      {remindersDisplay}
    </div>
  );
};

Reminder.propTypes = {
  reminders: PropTypes.arrayOf(PropTypes.object),
};

Reminder.defaultProps = {
  reminders: null,
};

export default Reminder;
