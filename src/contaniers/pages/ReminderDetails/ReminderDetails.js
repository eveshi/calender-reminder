import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';

import { timeStringGenerator } from '../../../utility/utility';
import Button from '../../../components/Button/Button';
import { deleteReminder, changeSessionReminder } from '../../../store/actions/index';

import Close from '../../../assets/icon/Close';
import Edit from '../../../assets/icon/Edit';
import Delete from '../../../assets/icon/Delete';

import './ReminderDetail.css';

export class ReminderDetails extends PureComponent {
  cleanSession = () => {
    const {
      changeSessionReminderHandler,
    } = this.props;
    const reminder = {
      id: null,
      time: null,
      reminder: null,
    };
    changeSessionReminderHandler(reminder);
  }

  deleteReminderHandler = () => {
    const {
      year,
      month,
      day,
      id,
      deleteReminderHandler,
    } = this.props;

    const {
      cleanSession,
    } = this;

    const date = dateFns.format(new Date(year, month, day), 'YYYYMMDD');

    deleteReminderHandler(date, id);
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
  deleteReminderHandler: PropTypes.func.isRequired,
  changeSessionReminderHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  year: state.reminderState.date.year,
  month: state.reminderState.date.month,
  day: state.reminderState.date.day,
  reminder: state.sessionState.reminder.reminder,
  id: state.sessionState.reminder.id,
  time: state.sessionState.reminder.time,
});

const mapActionToProps = dispatch => ({
  deleteReminderHandler: (date, id) => dispatch(deleteReminder(date, id)),
  changeSessionReminderHandler: reminder => dispatch(changeSessionReminder(reminder)),
});

export default connect(mapStateToProps, mapActionToProps)(ReminderDetails);
