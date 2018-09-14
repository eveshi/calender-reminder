import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { ReminderDetails } from './ReminderDetails';

configure({ adapter: new Adapter() });

const props = {
  year: 2033,
  month: 7,
  day: 18,
  id: 1330515905123,
  time: 1200,
  date: '20330718',
  reminder: 'Dinner',
  deleteReminder: jest.fn(),
  cleanSession: jest.fn(),
};

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <ReminderDetails {...props} />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
