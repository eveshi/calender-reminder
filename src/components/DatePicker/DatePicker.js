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
    datePickerDisabled: true,
  }

  componentDidMount() {
    const { datePickerDisabled } = this.props;
    this.setState({
      datePickerDisabled,
    });
  }

  dateChangeHandler = (event, selector) => {
    const {
      changeSessionDay,
      changeSessionMonth,
      changeSessionYear,
    } = this.props;
    const value = parseInt(event.target.value, 10);

    if (selector === 'year') {
      changeSessionYear(value);
    }

    if (selector === 'month') {
      changeSessionMonth(value);
    }

    if (selector === 'day') {
      changeSessionDay(value);
    }
  };

  datePickerDisabledHandler = () => {
    const { datePickerDisabled } = this.state;
    this.setState({
      datePickerDisabled: !datePickerDisabled,
    });
  };

  applyNewDate = () => {
    const {
      yearPicked,
      monthPicked,
      dayPicked,
      changeDay,
      changeYearAndMonth,
    } = this.props;
    changeYearAndMonth(yearPicked, monthPicked);
    changeDay(dayPicked);

    const { datePickerDisabledHandler } = this;
    datePickerDisabledHandler();
  };

  render() {
    const {
      yearPicked,
      monthPicked,
      dayPicked,
      yearArray,
      monthArray,
      dayArray,
      dayPickerDisabled,
      applyButtonDisabled,
    } = this.props;

    const {
      dateChangeHandler,
      datePickerDisabledHandler,
      applyNewDate,
    } = this;

    const { datePickerDisabled } = this.state;

    const dayPicker = dayPickerDisabled === true
      ? null
      : (
        <DayPicker
          dayArray={dayArray}
          dayPicked={dayPicked}
          onChange={event => dateChangeHandler(event, 'day')}
        />
      );

    const dayDisplay = dayPickerDisabled === true
      ? null
      : (
        <p className="DatePicker_date">{dayPicked}</p>
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
            {yearPicked.toString()}
          </p>
          <p className="DatePicker_date">
            {utility.monthStringGenerator(monthPicked)}
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
              yearArray={yearArray}
              onChange={event => dateChangeHandler(event, 'year')}
            />
            <MonthPicker
              monthPicked={monthPicked}
              monthArray={monthArray}
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
  yearPicked: PropTypes.number.isRequired,
  monthPicked: PropTypes.number.isRequired,
  dayPicked: PropTypes.number.isRequired,
  yearArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  monthArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  dayArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeDay: PropTypes.func.isRequired,
  changeYearAndMonth: PropTypes.func.isRequired,
  datePickerDisabled: PropTypes.bool,
  dayPickerDisabled: PropTypes.bool,
  applyButtonDisabled: PropTypes.bool,
  changeSessionYear: PropTypes.func.isRequired,
  changeSessionMonth: PropTypes.func.isRequired,
  changeSessionDay: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  dayPickerDisabled: true,
  datePickerDisabled: true,
  applyButtonDisabled: true,
};

const mapStateToProps = state => ({
  yearPicked: state.sessionState.year,
  monthPicked: state.sessionState.month.index,
  dayPicked: state.sessionState.day,
  yearArray: state.sessionState.yearArray,
  monthArray: state.sessionState.monthArray,
  dayArray: state.sessionState.dayArray,
});

const mapActionToProps = dispatch => ({
  changeDay: day => dispatch(actions.changeDay(day)),
  changeYearAndMonth: (year, month) => dispatch(actions.changeYearAndMonth(year, month)),
  changeSessionDay: day => dispatch(actions.changeSessionDay(day)),
  changeSessionMonth: month => dispatch(actions.changeSessionMonth(month)),
  changeSessionYear: year => dispatch(actions.changeSessionYear(year)),
});

export default connect(mapStateToProps, mapActionToProps)(DatePicker);
