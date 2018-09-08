import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import monthTrans from '../../utility/utility';
import Button from '../Button/Button';
import { CHANGE_DAY, CHANGE_YEAR_AND_MONTH } from '../../store/actions';

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
        string: monthTrans(i),
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
    });
  }

  dateChangeHandler = (event, selector) => {
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
          value={dayPicked}
          onChange={event => dateChangeHandler(event, 'day')}
        >
          {dayOptions}
        </select>
      );

    const dayDisplay = dayPickerDisabled === true
      ? null
      : (
        <p>{dayInit}</p>
      );

    const monthPicker = datePickerDisabled === true
      ? (
        <Button onClick={() => datePickerDisabledHandler()}>
          <p>
            {yearInit.toString()}
          </p>
          <p>
            {monthTrans(monthInit)}
          </p>
          {dayDisplay}
        </Button>
      )
      : (
        <div>
          <form>
            <select
              value={yearPicked}
              onChange={event => dateChangeHandler(event, 'year')}
            >
              {yearOptions}
            </select>
            <select
              value={monthPicked}
              onChange={event => dateChangeHandler(event, 'month')}
            >
              {monthOptions}
            </select>
            {dayPicker}
          </form>
          <Button
            onClick={() => applyNewDate()}
          >
            Apply
          </Button>
        </div>
      );

    return (
      <div>
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
  dayPickerDisabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  dayPickerDisabled: true,
};

const mapStateToProps = state => ({
  yearInit: state.date.year,
  monthInit: state.date.month,
  dayInit: state.date.day,
});

const mapActionToProps = dispatch => ({
  changeDay: day => dispatch(CHANGE_DAY(day)),
  changeYearAndMonth: (year, month) => dispatch(CHANGE_YEAR_AND_MONTH(year, month)),
});

export default connect(mapStateToProps, mapActionToProps)(DatePicker);
