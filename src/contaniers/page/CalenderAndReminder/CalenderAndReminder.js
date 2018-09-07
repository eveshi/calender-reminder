import React, { PureComponent } from 'react';
import dateFns from 'date-fns';
import Calender from '../../../components/Calender/Calender';
import Reminder from '../../../components/Reminder/Reminder';
import Button from '../../../components/Button/Button';
import AddReminder from '../../../assets/icon/AddReminder';

class CalenderAndReminder extends PureComponent {
  state = {
    currentYear: null,
    currentMonth: null,
    currentDay: null,
  }

  componentDidMount() {
    const date = new Date();
    const currentYear = dateFns.getYear(date);
    const currentMonth = dateFns.getMonth(date);
    const currentDay = dateFns.getDate(date);
    this.setState({
      currentYear,
      currentMonth,
      currentDay,
    });
  }

  render() {
    const {
      currentYear,
      currentMonth,
      currentDay,
    } = this.state;

    return (
      <div>
        <div>
          <p>
            {currentMonth}
            &nbsp;
            {currentYear}
          </p>
          <Button>
            <AddReminder />
          </Button>
        </div>
        <Calender />
        <Reminder />
      </div>
    );
  }
}

export default CalenderAndReminder;
