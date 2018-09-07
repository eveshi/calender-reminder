import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ReminderCell = (props) => {
  const {
    time,
    reminder,
    onClick,
  } = props;

  return (
    <Button onClick={onClick}>
      <p>{time}</p>
      <p>{reminder}</p>
    </Button>
  );
};

ReminderCell.propTypes = {
  time: PropTypes.string.isRequired,
  reminder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ReminderCell;
