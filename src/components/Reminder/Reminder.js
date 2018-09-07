import React from 'react';
import PropTypes from 'prop-types';
import ReminderCell from '../ReminderCell/ReminderCell';

const Reminder = (props) => {
  const {
    reminders,
  } = props;

  let remindersDisplay = [];

  if (reminders === null) {
    remindersDisplay = [(
      <p key="free">
        You get a free day!
      </p>
    )];
  } else {
    remindersDisplay = reminders.map(reminder => (
      <ReminderCell
        key={reminders.indexOf(reminder)}
        time={reminder.time}
        reminder={reminder.reminder}
      />
    ));
  }

  return (
    <div>
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
