import React, { PureComponent } from 'react';

import DatePicker from '../../../components/DatePicker/DatePicker';
import TimePicker from '../../../components/TimePicker/TimePicker';
import Input from '../../../components/Input/Input';

class AddReminder extends PureComponent {
  state = {
    reminder: '',
  }

  reminderChangeHandler = (event) => {
    const { value } = event.target;
    console.log(value);
  }

  applyTime = (event) => {
    const { id } = event.target;
    console.log(id);
  }

  render() {
    const {
      reminder,
    } = this.state;

    const {
      reminderChangeHandler,
      applyTime,
    } = this;

    return (
      <div>
        <DatePicker />
        <TimePicker
          applyTime={event => applyTime(event)}
        />
        <Input
          maxLength={50}
          placeholder="Dinner with Danny"
          value={reminder}
          onChange={event => reminderChangeHandler(event)}
        />
      </div>
    );
  }
}

export default AddReminder;
