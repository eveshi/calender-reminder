import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { CalenderAndReminder } from './CalenderAndReminder';

configure({ adapter: new Adapter() });

const props = {
  year: 2022,
  month: 3,
  day: 18,
  changeDay: jest.fn(),
  reminders: [],
};

jest.mock('../../../components/DatePicker/DatePicker.js', () => () => (
  <div id="DatePicker">
    DatePicker
  </div>));

jest.mock('../../../components/Reminder/Reminder.js', () => () => (
  <div id="Reminder">
    Reminder
  </div>));

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <CalenderAndReminder {...props} />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
