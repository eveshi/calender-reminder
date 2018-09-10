import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Reminder from './Reminder';

configure({ adapter: new Adapter() });

const props = {
  reminders: [],
};

jest.mock('../ReminderCell/ReminderCell.js', () => () => (
  <div id="ReminderCell">
    ReminderCell
  </div>));

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Reminder {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
