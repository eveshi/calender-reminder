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
  id: '12345678',
  time: 1200,
  reminder: 'abcdefg',
  deleteReminder: jest.fn(),
  changeSession: jest.fn(),
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
