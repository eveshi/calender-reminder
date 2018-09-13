import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as utility from '../../utility/utility';
import Button from '../Button/Button';
import * as actions from '../../store/actions';

import YearPicker from './Pickers/YearPicker';
import MonthPicker from './Pickers/MonthPicker';
import DayPicker from './Pickers/DayPicker';

import './DatePicker.css';

export class DatePicker extends PureComponent {
  state = {
    yearPicked: '2018',
    monthPicked: '0',
    dayPicked: '1',
    datePickerDisabled: true,
  }

  componentDidMount() {
    const {
      yearInit,
      monthInit,
      dayInit,
      datePickerDisabled,
    } = this.props;

    this.setState({
      yearPicked: `${yearInit}`,
      monthPicked: `${monthInit}`,
      dayPicked: `${dayInit}`,
      datePickerDisabled,
    });
  }

  dateChangeHandler = (event, selector) => {
    const {
      changeSessionDate,
    } = this.props;

    const { value } = event.target;
    let {
      yearPicked,
      monthPicked,
      dayPicked,
    } = this.state;

    if (selector === 'year') {
      yearPicked = value;
      this.setState({
        yearPicked,
      });
    }

    if (selector === 'month') {
      monthPicked = value;
      this.setState({
        monthPicked,
      });
    }

    if (selector === 'day') {
      dayPicked = value;
      this.setState({
        dayPicked,
      });
    }

    const date = utility.dateStringGenerator(yearPicked, monthPicked, dayPicked);

    changeSessionDate(date);
  }

  datePickerDisabledHandler = () => {
    const { datePickerDisabled } = this.state;
    this.setState({
      datePickerDisabled: !datePickerDisabled,
    });
  }

  applyNewDate = () => {
    const {
      yearPicked,
      monthPicked,
      dayPicked,
    } = this.state;

    const {
      changeDay,
      changeYearAndMonth,
    } = this.props;
    changeYearAndMonth(
      parseInt(yearPicked, 10),
      parseInt(monthPicked, 10),
    );
    changeDay(parseInt(dayPicked, 10));

    const { datePickerDisabled } = this.state;
    this.setState({
      datePickerDisabled: !datePickerDisabled,
    });
  }

  render() {
    const {
      yearPicked,
      monthPicked,
      dayPicked,
      datePickerDisabled,
    } = this.state;

    const {
      dateChangeHandler,
      datePickerDisabledHandler,
      applyNewDate,
    } = this;

    const {
      yearInit,
      monthInit,
      dayInit,
      dayPickerDisabled,
      applyButtonDisabled,
    } = this.props;

    const dayPicker = dayPickerDisabled === true
      ? null
      : (
        <DayPicker
          yearPicked={yearPicked}
          monthPicked={monthPicked}
          dayPicked={dayPicked}
          onChange={event => dateChangeHandler(event, 'day')}
        />
      );

    const dayDisplay = dayPickerDisabled === true
      ? null
      : (
        <p className="DatePicker_date">{dayInit}</p>
      );

    const applyButtonDisplay = applyButtonDisabled === true
      ? null
      : (
        <Button
          onClick={() => applyNewDate()}
        >
          Apply
        </Button>
      );

    const dateDisplay = datePickerDisabled === true
      ? (
        <Button onClick={() => datePickerDisabledHandler()}>
          <p className="DatePicker_date">
            {yearInit.toString()}
          </p>
          <p className="DatePicker_date">
            {utility.monthStringGenerator(monthInit)}
          </p>
          {dayDisplay}
          <p className="DatePicker_date">
            &gt;
          </p>
        </Button>
      )
      : (
        <div className="DatePicker_picker">
          <form>
            <YearPicker
              yearPicked={yearPicked}
              onChange={event => dateChangeHandler(event, 'year')}
            />
            <MonthPicker
              yearPicked={yearPicked}
              monthPicked={monthPicked}
              onChange={event => dateChangeHandler(event, 'month')}
            />
            {dayPicker}
          </form>
          {applyButtonDisplay}
        </div>
      );

    return (
      <div className="DatePicker">
        {dateDisplay}
      </div>
    );
  }
}

DatePicker.propTypes = {
  yearInit: PropTypes.number.isRequired,
  monthInit: PropTypes.number.isRequired,
  dayInit: PropTypes.number.isRequired,
  changeDay: PropTypes.func.isRequired,
  changeYearAndMonth: PropTypes.func.isRequired,
  datePickerDisabled: PropTypes.bool,
  dayPickerDisabled: PropTypes.bool,
  applyButtonDisabled: PropTypes.bool,
  changeSessionDate: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  dayPickerDisabled: true,
  datePickerDisabled: true,
  applyButtonDisabled: true,
};

const mapStateToProps = state => ({
  yearInit: state.reminderState.date.year,
  monthInit: state.reminderState.date.month,
  dayInit: state.reminderState.date.day,
});

const mapActionToProps = dispatch => ({
  changeDay: day => dispatch(actions.changeDay(day)),
  changeYearAndMonth: (year, month) => dispatch(actions.changeYearAndMonth(year, month)),
  changeSessionDate: date => dispatch(actions.changeSessionDate(date)),
});

export default connect(mapStateToProps, mapActionToProps)(DatePicker);
