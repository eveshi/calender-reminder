import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFns from 'date-fns';

import ConnectedDatePicker from '../../../components/DatePicker/DatePicker';
import ConnectedTimePicker from '../../../components/TimePicker/TimePicker';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import * as utility from '../../../utility/utility';
import * as actions from '../../../store/actions';

import Close from '../../../assets/icon/Close';
import Complete from '../../../assets/icon/Complete';

import './EditReminder.css';

export class EditReminder extends PureComponent {
  state = {
    reminder: '',
    preDate: null,
    datePicked: utility.formatCurrentDate,
  }

  componentDidMount() {
    const {
      preReminder,
      year,
      month,
      day,
      sessionDate,
    } = this.props;

    const datePicked = sessionDate === null
      ? utility.dateStringGenerator(year, month, day)
      : sessionDate;

    if (preReminder !== null) {
      const preDate = utility.dateStringGenerator(year, month, day);

      this.setState({
        reminder: preReminder,
        preDate,
        datePicked,
      });
    } else {
      this.setState({
        datePicked,
      });
    }
  }

  reminderChangeHandler = (event) => {
    const { value } = event.target;
    this.setState({
      reminder: value,
    });
  }

  cleanSession = () => {
    const {
      changeSessionReminder,
    } = this.props;
    const reminder = {
      id: null,
      time: null,
      reminder: null,
    };
    changeSessionReminder(reminder);
  }

  submitReminder = () => {
    const {
      reminder,
      preDate,
    } = this.state;

    const {
      cleanSession,
    } = this;

    const {
      sessionDate,
      sessionTime,
      preId,
      postReminder,
      putReminder,
    } = this.props;

    const date = (sessionDate === null || dateFns.isPast(sessionDate))
      ? utility.formatCurrentDate
      : sessionDate;

    const defaultTime = dateFns.isPast(sessionDate)
      ? utility.timeIDGenerator(dateFns.getHours(new Date()), utility.minuteFiveGenerator())
      : 0;

    const time = sessionTime === null
      ? defaultTime
      : sessionTime;

    if (preId === null) {
      postReminder(date, time, reminder);
    } else {
      putReminder(preDate, date, preId, time, reminder);
    }

    cleanSession();
  }

  render() {
    const {
      preTime,
    } = this.props;

    let hourString = null;
    let minuteString = null;

    if (preTime) {
      const hour = parseInt(preTime / 100, 10);
      const minute = preTime % 100;
      hourString = utility.hourStringGenerator(hour);
      minuteString = utility.minuteStringGenerator(minute);
    }

    const {
      reminder,
      datePicked,
    } = this.state;

    const {
      reminderChangeHandler,
      submitReminder,
      cleanSession,
    } = this;

    return (
      <div className="EditReminder">
        <div className="EditReminder_header">
          <Link to="/">
            <Button onClick={() => cleanSession()}>
              <Close />
            </Button>
          </Link>
          <Link to="/">
            <Button onClick={() => submitReminder()}>
              <Complete />
            </Button>
          </Link>
        </div>
        <div className="EditReminder_form">
          <ConnectedDatePicker
            dayPickerDisabled={false}
            datePickerDisabled={false}
          />
          <ConnectedTimePicker
            hourInit={hourString}
            minuteInit={minuteString}
            datePicked={datePicked}
          />
          <div className="EditReminder_form_input">
            <Input
              maxLength="50"
              placeholder="Dinner with Danny..."
              value={reminder}
              onChange={event => reminderChangeHandler(event)}
            />
            <p>
              {reminder.length}
              /50
            </p>
          </div>
        </div>
      </div>
    );
  }
}

EditReminder.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  preReminder: PropTypes.string,
  preId: PropTypes.string,
  preTime: PropTypes.number,
  sessionDate: PropTypes.string,
  sessionTime: PropTypes.number,
  postReminder: PropTypes.func.isRequired,
  putReminder: PropTypes.func.isRequired,
  changeSessionReminder: PropTypes.func.isRequired,
};

EditReminder.defaultProps = {
  preReminder: null,
  preId: null,
  preTime: null,
  sessionDate: null,
  sessionTime: null,
};

const mapStateToProps = state => ({
  year: state.reminderState.date.year,
  month: state.reminderState.date.month,
  day: state.reminderState.date.day,
  sessionDate: state.sessionState.date,
  sessionTime: state.sessionState.time,
  preReminder: state.sessionState.reminder.reminder,
  preId: state.sessionState.reminder.id,
  preTime: state.sessionState.reminder.time,
});

const mapActionToProps = dispatch => ({
  postReminder: (date, time, reminder) => dispatch(actions.postReminder(date, time, reminder)),
  putReminder: (preDate, nextDate, id, time, reminder) => dispatch(
    actions.putReminder(preDate, nextDate, id, time, reminder),
  ),
  changeSessionReminder: reminder => dispatch(actions.changeSessionReminder(reminder)),
});

export default connect(mapStateToProps, mapActionToProps)(EditReminder);
