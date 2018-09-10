import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';

import { timeStringGenerator } from '../../../utility/utility';
import Button from '../../../components/Button/Button';
import { DELETE_REMINDER, CHANGE_SESSION } from '../../../store/actions/index';

import Close from '../../../assets/icon/Close';
import Edit from '../../../assets/icon/Edit';
import Delete from '../../../assets/icon/Delete';

import './ReminderDetail.css';

class ReminderDetails extends PureComponent {
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

  deleteReminderHandler = () => {
    const {
      year,
      month,
      day,
      id,
      deleteReminder,
    } = this.props;

    const {
      cleanSession,
    } = this;

    const date = dateFns.format(new Date(year, month, day), 'YYYYMMDD');

    deleteReminder(date, id);
    cleanSession();
  }

  render() {
    const {
      year,
      month,
      day,
      time,
      reminder,
    } = this.props;

    const {
      deleteReminderHandler,
      cleanSession,
    } = this;

    const timeString = timeStringGenerator(time);

    return (
      <div className="ReminderDetails">
        <div className="ReminderDetails_header">
          <Link to="/">
            <Button onClick={() => cleanSession()}>
              <Close />
            </Button>
          </Link>
          <Link to="/edit_reminder">
            <Edit />
          </Link>
        </div>
        <div className="ReminderDetails_content">
          <p className="ReminderDetails_content_time">
            {year}
            -
            {month}
            -
            {day}
          </p>
          <p className="ReminderDetails_content_time">
            {timeString}
          </p>
          <p className="ReminderDetails_content_reminder">
            {reminder}
          </p>
          <Link to="/">
            <Button onClick={() => deleteReminderHandler()}>
              <Delete />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

ReminderDetails.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  reminder: PropTypes.string.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  year: state.date.year,
  month: state.date.month,
  day: state.date.day,
  reminder: state.session.reminder.reminder,
  id: state.session.reminder.id,
  time: state.session.reminder.time,
});

const mapActionToProps = dispatch => ({
  deleteReminder: (date, id) => dispatch(DELETE_REMINDER(date, id)),
  changeSession: reminder => dispatch(CHANGE_SESSION(null, null, reminder)),
});

export default connect(mapStateToProps, mapActionToProps)(ReminderDetails);
