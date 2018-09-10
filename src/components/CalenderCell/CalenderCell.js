import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './CalenderCell.css';

const CalenderCell = (props) => {
  const {
    onClick,
    day,
    picked,
  } = props;

  const cellClass = picked
    ? 'Calender_CalenderCell__picked'
    : 'Calender_CalenderCell__notPicked';

  return (
    <div className={cellClass}>
      <Button
        onClick={onClick}
        id={day}
      >
        {day}
      </Button>
    </div>
  );
};

CalenderCell.propTypes = {
  onClick: PropTypes.func,
  day: PropTypes.number,
  picked: PropTypes.bool.isRequired,
};

CalenderCell.defaultProps = {
  onClick: null,
  day: null,
};

export default CalenderCell;
