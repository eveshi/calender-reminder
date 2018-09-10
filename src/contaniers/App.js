import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ConnectedCalenderAndReminder from './page/CalenderAndReminder/CalenderAndReminder';
import ConnectedEditReminder from './page/EditReminder/EditReminder';
import ConnectedReminderDetails from './page/ReminderDetails/ReminderDetails';
import './App.css';

class App extends PureComponent {
  state = {
    hasError: false,
    errorInfo: null,
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorInfo: info,
    });
  }

  render() {
    const {
      hasError,
      errorInfo,
    } = this.state;
    const display = hasError === true
      ? <h1>{errorInfo.componentStack}</h1>
      : (
        <BrowserRouter>
          <div className="layout">
            <Route exact path="/" component={ConnectedCalenderAndReminder} />
            <Route path="/edit_reminder" component={ConnectedEditReminder} />
            <Route path="/reminder_details" component={ConnectedReminderDetails} />
          </div>
        </BrowserRouter>
      );

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default App;
