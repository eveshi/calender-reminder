import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import * as utility from '../../utility/utility';
import Button from '../Button/Button';
import * as actions from '../../store/actions';

import './DatePicker.css';

class DatePicker extends PureComponent {
  state = {
    yearArray: null,
    monthArray: null,
    dayArray: null,
    yearPicked: 0,
    monthPicked: 0,
    dayPicked: 0,
    datePickerDisabled: true,
  }

  componentDidMount() {
    const {
      yearInit,
      monthInit,
      dayInit,
      datePickerDisabled,
    } = this.props;

    const currentYear = dateFns.getYear(new Date());
    const yearArray = [];
    for (let i = currentYear; i < currentYear + 31; i += 1) {
      yearArray.push(i);
    }

    const monthArray = [];
    for (let i = 0; i < 12; i += 1) {
      const month = {
        index: i,
        string: utility.monthStringGenerator(i),
      };
      monthArray.push(month);
    }

    const daysInMonthPicked = dateFns.getDaysInMonth(new Date(yearInit, monthInit, 1));
    const dayArray = [];
    for (let i = 1; i < daysInMonthPicked + 1; i += 1) {
      dayArray.push(i);
    }

    this.setState({
      yearArray,
      monthArray,
      dayArray,
      yearPicked: yearInit,
      monthPicked: monthInit,
      dayPicked: dayInit,
      datePickerDisabled,
    });
  }

  dateChangeHandler = (event, selector) => {
    const {
      changeSession,
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

    changeSession(date);
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
      yearArray,
      monthArray,
      dayArray,
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

    const yearOptions = yearArray === null
      ? null
      : yearArray.map(year => (
        <option
          key={year}
          value={year}
        >
          {year}
        </option>
      ));

    const monthOptions = monthArray === null
      ? null
      : monthArray.map(month => (
        <option
          key={month.index}
          value={month.index}
        >
          {month.string}
        </option>
      ));

    const dayOptions = dayArray === null
      ? null
      : dayArray.map(day => (
        <option
          key={day}
          value={day}
        >
          {day}
        </option>
      ));

    const dayPicker = dayPickerDisabled === true
      ? null
      : (
        <select
          className="DatePicker_picker_select"
          value={dayPicked}
          onChange={event => dateChangeHandler(event, 'day')}
        >
          {dayOptions}
        </select>
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

    const monthPicker = datePickerDisabled === true
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
            <select
              className="DatePicker_picker_select"
              value={yearPicked}
              onChange={event => dateChangeHandler(event, 'year')}
            >
              {yearOptions}
            </select>
            <select
              className="DatePicker_picker_select"
              value={monthPicked}
              onChange={event => dateChangeHandler(event, 'month')}
            >
              {monthOptions}
            </select>
            {dayPicker}
          </form>
          {applyButtonDisplay}
        </div>
      );

    return (
      <div className="DatePicker">
        {monthPicker}
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
  changeSession: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  dayPickerDisabled: true,
  datePickerDisabled: true,
  applyButtonDisabled: true,
};

const mapStateToProps = state => ({
  yearInit: state.date.year,
  monthInit: state.date.month,
  dayInit: state.date.day,
});

const mapActionToProps = dispatch => ({
  changeDay: day => dispatch(actions.CHANGE_DAY(day)),
  changeYearAndMonth: (year, month) => dispatch(actions.CHANGE_YEAR_AND_MONTH(year, month)),
  changeSession: date => dispatch(actions.CHANGE_SESSION(date, null, null)),
});

export default connect(mapStateToProps, mapActionToProps)(DatePicker);
