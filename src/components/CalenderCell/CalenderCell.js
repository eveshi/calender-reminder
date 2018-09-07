import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './CalenderCell.css';

const CalenderCell = (props) => {
  const {
    onClick,
    day,
  } = props;

  return (
    <div>
      <Button onClick={onClick}>
        {day}
      </Button>
    </div>
  );
};

CalenderCell.propTypes = {
  onClick: PropTypes.func,
  day: PropTypes.number,
};

CalenderCell.defaultProps = {
  onClick: null,
  day: null,
};

export default CalenderCell;
