import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CalenderAndReminder from './page/CalenderAndReminder/CalenderAndReminder';
import EditReminder from './page/EditReminder/EditReminder';
import ReminderDetails from './page/ReminderDetails/ReminderDetails';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="layout">
      <Route exact path="/" component={CalenderAndReminder} />
      <Route path="/edit_reminder" component={EditReminder} />
      <Route path="/reminder_details" component={ReminderDetails} />
    </div>
  </BrowserRouter>
);

export default App;
