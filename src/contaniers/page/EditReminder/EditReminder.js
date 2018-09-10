import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ConnectedDatePicker from '../../../components/DatePicker/DatePicker';
import ConnectedTimePicker from '../../../components/TimePicker/TimePicker';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import * as utility from '../../../utility/utility';
import { POST_REMINDER, PUT_REMINDER, CHANGE_SESSION } from '../../../store/actions';

import Close from '../../../assets/icon/Close';
import Complete from '../../../assets/icon/Complete';

import './EditReminder.css';

export class EditReminder extends PureComponent {
  state = {
    reminder: '',
    preDate: null,
  }

  componentDidMount() {
    const {
      preReminder,
      year,
      month,
      day,
    } = this.props;

    if (preReminder !== null) {
      const preDate = utility.dateStringGenerator(year, month, day);

      this.setState({
        reminder: preReminder,
        preDate,
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
      changeSession,
    } = this.props;
    const reminder = {
      id: null,
      time: null,
      reminder: null,
    };
    changeSession(null, null, reminder);
  }

  submitReminder = () => {
    const {
      reminder,
      preDate,
      hourInit,
      minuteInit,
    } = this.state;

    const {
      cleanSession,
    } = this;

    const {
      sessionDate,
      sessionTime,
      year,
      month,
      day,
      preId,
      postReminder,
      putReminder,
    } = this.props;

    const date = sessionDate === null
      ? utility.dateStringGenerator(year, month, day)
      : sessionDate;

    const time = sessionTime === null
      ? parseInt(`${hourInit}${minuteInit}`, 10)
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

    const hour = parseInt(preTime / 100, 10);
    const minute = preTime % 100;
    const hourString = utility.hourStringGenerator(hour);
    const minuteString = utility.minuteStringGenerator(minute);

    const {
      reminder,
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
  changeSession: PropTypes.func.isRequired,
};

EditReminder.defaultProps = {
  preReminder: null,
  preId: null,
  preTime: null,
  sessionDate: null,
  sessionTime: null,
};

const mapStateToProps = state => ({
  year: state.date.year,
  month: state.date.month,
  day: state.date.day,
  sessionDate: state.session.date,
  sessionTime: state.session.time,
  preReminder: state.session.reminder.reminder,
  preId: state.session.reminder.id,
  preTime: state.session.reminder.time,
});

const mapActionToProps = dispatch => ({
  postReminder: (date, time, reminder) => dispatch(POST_REMINDER(date, time, reminder)),
  putReminder: (preDate, nextDate, id, time, reminder) => dispatch(
    PUT_REMINDER(preDate, nextDate, id, time, reminder),
  ),
  changeSession: reminder => dispatch(CHANGE_SESSION(null, null, reminder)),
});

export default connect(mapStateToProps, mapActionToProps)(EditReminder);
