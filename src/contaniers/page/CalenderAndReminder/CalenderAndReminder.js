import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Calender from '../../../components/Calender/Calender';
import Reminder from '../../../components/Reminder/Reminder';
import Button from '../../../components/Button/Button';
import DatePicker from '../../../components/DatePicker/DatePicker';

import AddReminder from '../../../assets/icon/AddReminder';

import { CHANGE_DAY } from '../../../store/actions/index';

const CalenderAndReminder = (props) => {
  const {
    year,
    month,
    day,
    changeDay,
  } = props;

  const dayChangeHandler = (event) => {
    const { id } = event.target;
    changeDay(parseInt(id, 10));
  };

  return (
    <div>
      <div>
        <DatePicker />
        <DatePicker dayPickerDisabled={false} />
        <Button>
          <AddReminder />
        </Button>
      </div>
      <Calender
        year={year}
        month={month}
        day={day}
        onClick={event => dayChangeHandler(event)}
      />
      <Reminder />
    </div>
  );
};

CalenderAndReminder.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  changeDay: PropTypes.func.isRequired,
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
