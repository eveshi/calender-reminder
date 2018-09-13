import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ConnectedCalenderAndReminder from './pages/CalenderAndReminder/CalenderAndReminder';
import ConnectedEditReminder from './pages/EditReminder/EditReminder';
import ConnectedReminderDetails from './pages/ReminderDetails/ReminderDetails';
import ErrorBoundary from '../HOC/ErrorBoundary';
import './App.css';

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <div className="layout">
        <Route exact path="/" component={ConnectedCalenderAndReminder} />
        <Route path="/edit_reminder" component={ConnectedEditReminder} />
        <Route path="/reminder_details" component={ConnectedReminderDetails} />
      </div>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
